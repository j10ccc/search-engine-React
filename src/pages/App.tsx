import { Layout, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEFooter from "../components/SEFooter";
import "./App.css";
const { Content } = Layout;
const { Search } = Input;

export default function App() {
  // const [darkMode, setDarkMode] = useState(true);
  sessionStorage.clear();
  const [keyWord, setKeyWord] = useState<String>();

  function onChangeKeyWord(e: any) {
    setKeyWord(e.target.value);
    // TODO: 空搜索 undefined
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <div className="search-area">
          <h1>图片</h1>
          <Search
            enterButton={<Link to={"/search?word=" + keyWord}>牛马一下</Link>}
            size="large"
            onChange={onChangeKeyWord}
          />
        </div>
      </Content>
      <SEFooter />
    </Layout>
  );
}
