import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import "./index.css";
import "antd/dist/antd.css";
import SearchResult from "./pages/SearchResult";
import ImageResult from "./routes/ImageResult";
import TextResult from "./routes/TextResult";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/search/*" element={<SearchResult />}>
          <Route index element={<TextResult />}></Route>
          <Route path="image" element={<ImageResult />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
