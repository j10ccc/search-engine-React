import { Alert, Divider, Layout, Pagination, Space, Spin } from "antd";
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

export default function SearchResult(props: any) {
  const keyWord = decodeURI(location.href.split("?word=")[1]);
  const [resultList, setResultList] = useState<ResultItemType[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  if (keyWord === "") window.location.href = "/";

  function initialResultList(data: ResultItemType[]) {
    setResultList(
      data.map((item: ResultItemType) => {
        const pos = item.Content.indexOf(keyWord);
        const reg = /[^A-Za-z0-9\u4e00-\u9fa5+]/g;
        let i = pos;
        for (i = pos; i > 0; i--) {
          if (reg.test(item.Content[i])) break;
        }
        const content = item.Content.slice(
          i + 1,
          i + 100 <= item.Content.length ? pos + 100 : item.Content.length
        );
        return {
          ID: item.ID,
          Title: item.Title,
          URL: item.URL,
          Content: content.replace(/\s*/g, "")
        };
      })
    );
  }
  let isRequested = false;
  useEffect(() => {
    if (!isRequested) {
      setLoading(true);
      getSearchResultAPI({ word: keyWord, paperNum: 1 }).then((res) => {
        initialResultList(res.data.data.Data);
        setTotal(res.data.data.Length);
        setLoading(false);
      });
    }
    isRequested = true;
  }, []);

  async function changePage(page: number) {
    document.querySelector(".result-content")?.scrollTo(0, 0);
    setPage(page);
    setLoading(true);
    await getSearchResultAPI({ word: keyWord, paperNum: page }).then((res) => {
      initialResultList(res.data.data.Data);
      setTotal(res.data.data.Length);
    });
    setLoading(false);
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <SEHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      {!loading ? (
        <Content
          className="result-content"
          style={{ overflowY: "scroll", backgroundColor: "white" }}>
          <div className="align-content result-info">共找到 {total} 条结果</div>
          <div className="align-content">
            <Space direction="vertical" size="small">
              {resultList?.slice(0, page * 10)?.map((item, index) => (
                <ResultItem item={item} key={index} />
              ))}
            </Space>
          </div>
          <Pagination
            current={page}
            hideOnSinglePage
            pageSize={10}
            className="pagination"
            defaultCurrent={1}
            total={total}
            showSizeChanger={false}
            onChange={changePage}
          />
          <Divider />
          <SEFooter />
        </Content>
      ) : (
        <div className="align-content loading">
          <Spin tip="Loading">
            <Alert message="加载中" description="后台正在全速运算中" />
          </Spin>
        </div>
      )}
    </Layout>
  );
}
