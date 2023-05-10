import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import { IPCMainEvent, IPCMainWindowRendererEvent } from "@/types/electron";
import path from "path";
import fs from "fs/promises";
import { logError } from "./shared/utils/errors";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

async function handleFileOpen() {
  const filesPaths = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });
  if (filesPaths.length !== 1) {
    console.error("Error! Only one file can be read at a time!");
    return;
  }
  const filePath = filesPaths[0];
  const fileExt = path.extname(filePath);
  const isFileASupportedImage = [".jpg", ".png", ".jpeg"].includes(fileExt);

  if (!isFileASupportedImage) {
    console.log(
      `File with extension ${fileExt} is not supported! Try to open jpg/png/jpeg files!`
    );
    return;
  }

  let fileBase64Data: string;

  try {
    fileBase64Data = (await fs.readFile(filePath)).toString("base64");
  } catch (error) {
    logError(error);
    return;
  }

  mainWindow.webContents.send(
    IPCMainWindowRendererEvent.TransferImageToRenderer,
    fileBase64Data
  );
}

function createMenuForMainWindow() {
  return Menu.buildFromTemplate([
    {
      label: "Файл",
      submenu: [
        {
          label: "Открыть",
          click: handleFileOpen,
        },
      ],
    },
  ]);
}

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.setMenu(createMenuForMainWindow());
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // TODO check env variable
  // if (process.env.NODE_ENV === "DEVELOPMENT") {
  mainWindow.webContents.openDevTools();
  // }
};
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    registerIPCListeners();
  }
});

function registerIPCListeners() {
  ipcMain.on(IPCMainEvent.Log, (event, str?: string) => {
    if (str === undefined) {
      console.error(
        "Error! Received undefined instead of string! Cannot perform log operation!"
      );
      return;
    }
    console.log(str);
  });
}
