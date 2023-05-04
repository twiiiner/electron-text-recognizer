import { contextBridge, ipcRenderer } from "electron";
import { IPCMainEvent } from "@/types/electron";

contextBridge.exposeInMainWorld("electron", {
  log(str?: string) {
    ipcRenderer.send(IPCMainEvent.Log, str);
  },
});
