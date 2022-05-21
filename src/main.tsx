import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import "./index.css";
import "antd/dist/antd.css";
import SearchResult from "./pages/SearchResult";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/search" element={<SearchResult />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
