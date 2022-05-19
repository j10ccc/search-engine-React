import { Col, Layout, Row, Input, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import SESwitch from "../SESwitch";
import { useSize } from "ahooks";
import "./index.css";
const { Header } = Layout;
const { Search } = Input;

export default function SEHeader(props: any) {
  const { darkMode, setDarkMode } = props;
  const [keyWord, setKeyWord] = useState("");

  const ref = useRef(null);
  const size = useSize(ref);
  return (
    <header>
      <div className="header-wrapper">
        <Space>
          <span>🐮🐴</span>
          <Search />
          <SESwitch darkMode={darkMode} setDarkMode={setDarkMode} />
        </Space>
      </div>
    </header>
  );
}
