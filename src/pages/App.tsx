import { Layout, Input } from "antd";
import React, { useState } from "react";
import SEFooter from "../components/SEFooter";
import "./App.css";
const { Content } = Layout;
const { Search } = Input;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  function onSearch(value: string) {
    window.location.href = "/search?word=" + value;
    console.log(value);
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <div className="search-area">
          <h1>图片</h1>
          <Search
            allowClear
            enterButton="牛马一下"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </Content>
      <SEFooter />
    </Layout>
  );
}