import { Input, Space } from "antd";
import { postHistoryAPI } from "../../api/submitHistory";
// import SESwitch from "../SESwitch";
import "./index.css";
const { Search } = Input;

export default function SEHeader(props: any) {
  // const { darkMode, setDarkMode } = props;
  const keyWord = decodeURI(location.href.split("?word=")[1]);

  function onSearch(value: string) {
    postHistoryAPI({ preWord: keyWord, word: value }).then((res) => {
      if (res.data.msg === "SUCCESS")
        window.location.href = "/search?word=" + value;
    });
    console.log(keyWord, value);
  }
  return (
    <header>
      <Space
        className="header-wrapper"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <a href="/">🐮🐴</a>
          <Search
            size="large"
            enterButton="牛马一下"
            className="search-bar"
            defaultValue={decodeURI(window.location.href.split("word=")[1])}
            onSearch={onSearch}
          />
        </Space>
        {/*        <SESwitch darkMode={darkMode} setDarkMode={setDarkMode} />
         */}
      </Space>
    </header>
  );
}
