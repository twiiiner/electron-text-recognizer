import React from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./pages/MainPage";
import "../../assets/styles/index.css";

const root = createRoot(document.getElementById("root")!);

root.render(<MainPage />);
