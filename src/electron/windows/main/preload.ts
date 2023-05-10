import { contextBridge, ipcRenderer } from "electron";
import { IPCMainEvent, IPCMainWindowRendererEvent } from "@/types/electron";

contextBridge.exposeInMainWorld("electron", {
  log(str?: string) {
    ipcRenderer.send(IPCMainEvent.Log, str);
  },
  registerImageTransferCallback(callback: (imageBase64Data: string) => void) {
    ipcRenderer.on(
      IPCMainWindowRendererEvent.TransferImageToRenderer,
      (event, imageBase64Data) => {
        callback(imageBase64Data);
      }
    );
  },
});
