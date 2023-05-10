import React from "react";
import { windowMain } from "@/frontend/windows/main/types";

export default function MainPage() {
  return <div>Hello from main page!</div>;
}

windowMain.electron.registerImageTransferCallback((imageBase64Data) => {
  console.log(imageBase64Data);
});
