import React from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./pages/MainPage";

const root = createRoot(document.getElementById("root")!);

root.render(<MainPage />);
