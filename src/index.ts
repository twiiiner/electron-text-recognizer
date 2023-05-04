import { app, BrowserWindow, ipcMain } from "electron";
import { IPCMainEvent } from "@/types/electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
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
