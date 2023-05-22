import React from "react";
import { windowMain } from "@/frontend/windows/main/types";
import classes from "./MainPage.module.css";

export default function MainPage() {
  return <div className={classes.root}>Hello from main page!</div>;
}

windowMain.electron.registerImageTransferCallback((imageBase64Data) => {
  console.log(imageBase64Data);
});
