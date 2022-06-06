import { Input, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postHistoryAPI } from "../../api/submitHistory";
// import SESwitch from "../SESwitch";
import "./index.css";
const { Search } = Input;

export default function SEHeader(props: any) {
  // const { darkMode, setDarkMode } = props;
  const { searchMode, keyWord, setKeyWord } = props;
  const [tmp, setTmp] = useState(keyWord);
  const navigate = useNavigate();

  useEffect(() => {
    setTmp(keyWord);
  }, [keyWord]);

  function onChangeKeyWord(e: any) {
    setTmp(e.target.value);
    // setSearchParmars(e.target.value);
    // TODO: 动态搜索
  }
  function onSearch() {
    setKeyWord(tmp);
    navigate(`/search${searchMode === "text" ? "" : "/image"}?word=${tmp}`);
    if (keyWord !== tmp) postHistoryAPI({ preWord: keyWord, word: tmp });
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
              // enterButton={}
              className="search-bar"
              defaultValue={keyWord}
              value={tmp}
              onChange={onChangeKeyWord}
              onSearch={onSearch}
            />
          </Space>
        </Space>
        {/*        <SESwitch darkMode={darkMode} setDarkMode={setDarkMode} />
         */}
      </Space>
    </header>
  );
}
