import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import SESwitch from "../SESwitch";
import "./index.css";
const { Search } = Input;

export default function SEHeader(props: any) {
  // const { darkMode, setDarkMode } = props;
  const [searchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState(searchParams.get("word") || "");

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);
  function onChangeKeyWord(e: any) {
    // setSearchParmars(e.target.value);
    // TODO: 动态搜索
    setKeyWord(e.target.value);
    console.log(keyWord);
  }

  return (
    <header>
      <Space
        className="header-wrapper"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <a href="/">🐮🐴</a>
          <Space>
            <Search
              size="large"
              enterButton={<Link to={`/search?word=${keyWord}`}>牛马一下</Link>}
              className="search-bar"
              defaultValue={keyWord}
              onChange={onChangeKeyWord}
              // onSearch={onSearch}
            />
          </Space>
        </Space>
        {/*        <SESwitch darkMode={darkMode} setDarkMode={setDarkMode} />
         */}
      </Space>
    </header>
  );
}
