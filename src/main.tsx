import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import Result from "./SearchResult";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/search" element={<Result />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
