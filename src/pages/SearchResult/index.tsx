import { Divider, Input, Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { getSearchResultAPI } from "../../api/search";
import ResultItem from "../../components/ResultItem";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
const { Content } = Layout;

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
  const [total, setTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  if (keyWord === "") window.location.href = "/";

  let isRequested = false;
  useEffect(() => {
    if (!isRequested) {
      getSearchResultAPI(keyWord).then((res) => {
        setResultList(res.data.data.Data);
        setTotal(res.data.data.Length);
      });
    }
    isRequested = true;
  }, []);

  function onSearch(value: string) {
    window.location.href = "/search?" + value;
    console.log(value);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <SEHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      <Content style={{ overflowY: "scroll", backgroundColor: "white" }}>
        <div className="align-content result-info">共找到 {total} 条结果</div>
        <div className="align-content">
          <Space direction="vertical">
            {resultList?.map((item, index) => (
              <ResultItem item={item} key={index} />
            ))}
          </Space>
        </div>
        <Divider />
        <SEFooter />
      </Content>
    </Layout>
  );
}
