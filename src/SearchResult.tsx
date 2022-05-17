import { Input, Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { getSearchResultAPI } from "./api/search";
import ResultItem from "./components/ResultItem";
import SEFooter from "./components/SEFooter";
const { Header, Content } = Layout;
const { Search } = Input;

export type ResultItemType = {
  ID: number;
  Title: string;
  URL: string;
  Content: string;
};

export default function Result() {
  const keyWord = location.href.split("?word=")[1];
  const [resultList, setResultList] = useState<ResultItemType[]>();
  const [page, setPage] = useState(1);
  if (keyWord === "") window.location.href = "/";

  let isRequested = false;
  useEffect(() => {
    if (!isRequested) {
      getSearchResultAPI(keyWord).then((res) => {
        setResultList(res.data.data.Data);
      });
    }
    isRequested = true;
  }, []);
  const resultListStyle = {
    marginLeft: "180px"
  };

  function onSearch(value: string) {
    window.location.href = "/search?" + value;
    console.log(value);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex" }}>
        <Space>
          <Search />
        </Space>
      </Header>

      <Content style={{ overflowY: "scroll", backgroundColor: "white" }}>
        <Space direction="vertical" style={resultListStyle}>
          {resultList?.map((item, index) => (
            <ResultItem item={item} key={index} />
          ))}
        </Space>
      </Content>
      <SEFooter />
    </Layout>
  );
}
