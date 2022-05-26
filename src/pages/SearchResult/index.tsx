import { Divider, Layout, Pagination, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getRelatedAPI } from "../../api/related";
import { getSearchResultAPI } from "../../api/search";
import ResultItem from "../../components/ResultItem";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
import { useSessionStorageState } from "ahooks";
import RelatedList from "../../components/RelatedList";
import SELoading from "../../components/SELoading";
import SESider from "../../components/SESider";
import { getCollectionAPI } from "../../api/getCollection";
const { Content } = Layout;

export type ResultItemType = {
  id: number;
  title: string;
  url: string;
  content: string;
};
export type CollectionItem = {
  id: number;
  url: string;
  title: string;
  mark?: boolean;
};
export default function SearchResult(props: any) {
  const keyWord = decodeURI(location.href.split("?word=")[1]);
  const [resultList, setResultList] = useState<ResultItemType[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [relatedList, setRelatedList] = useState<string[]>();
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");
  const [uid, setUid] = useState(1);
  const [collectionList, setCollectionList] = useState<CollectionItem[]>();

  if (keyWord === "") window.location.href = "/";

  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }

  function initialResultList(data: ResultItemType[]) {
    setResultList(
      data.map((item: ResultItemType) => {
        const pos = item.content.indexOf(keyWord);
        const reg = /[^A-Za-z0-9\u4e00-\u9fa5+]/g;
        let i = pos;
        for (i = pos; i > 0; i--) {
          if (reg.test(item.content[i])) break;
        }
        const content = item.content.slice(
          i + 1,
          i + 100 <= item.content.length ? pos + 100 : item.content.length
        );
        return {
          id: item.id,
          title: item.title,
          url: item.url,
          content: content.replace(/\s*/g, "")
        };
      })
    );
  }
  let isRequested = false;
  useEffect(() => {
    if (!isRequested) {
      setLoading(true);
      let content = keyWord;
      if (filterList !== undefined) {
        content += filterList?.map((item) => "-" + item).join("");
      }
      getSearchResultAPI({
        word: content,
        paperNum: 1
      })
        .then((res) => {
          initialResultList(
            res.data.data.Data.map((item: any) => {
              return {
                id: item.ID,
                title: item.Title,
                url: item.URL,
                content: item.Content
              };
            })
          );
          setTotal(res.data.data.Length);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      getRelatedAPI(keyWord).then((res) => {
        if (res.data.data != null) setRelatedList(res.data.data);
      });
      getCollectionAPI(uid).then((res) => {
        console.log(res.data.data);
        setCollectionList(
          res.data.data.data.map((item: any) => ({
            id: item.id,
            url: item.url,
            title: item.title,
            mark: true
          }))
        );
      });
    }
    isRequested = true;
  }, []);

  async function changePage(page: number) {
    document.querySelector(".result-content")?.scrollTo(0, 0);
    setPage(page);
    setLoading(true);
    await getSearchResultAPI({
      word: keyWord + filterList?.map((item) => "-" + item).join(""),
      paperNum: page
    }).then((res) => {
      initialResultList(
        res.data.data.Data.map((item: any) => {
          return {
            id: item.ID,
            title: item.Title,
            url: item.URL,
            content: item.Content
          };
        })
      );
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
          <Space direction="vertical" size="small">
            <div className="align-content result-info">
              共找到 {total} 条结果
            </div>
            <Select
              open={false}
              className="align-content fit-width filter"
              mode="tags"
              defaultValue={filterList}
              placeholder="请输入过滤词"
              onChange={handleFilterChange}
            />
            <Space direction="vertical" size="small" className="align-content">
              {resultList?.slice(0, page * 10)?.map((item, index) => (
                <ResultItem
                  item={item}
                  key={index}
                  index={index}
                  uid={uid}
                  collectionList={collectionList}
                  setCollectionList={setCollectionList}
                />
              ))}
            </Space>
            {relatedList ? <RelatedList relatedList={relatedList} /> : null}
            <Pagination
              current={page}
              hideOnSinglePage
              pageSize={10}
              className="pagination align-content"
              defaultCurrent={1}
              total={total}
              showSizeChanger={false}
              onChange={changePage}
            />
          </Space>
          <Divider />
          <SEFooter />
        </Content>
      ) : (
        <SELoading />
      )}
      <SESider
        uid={uid}
        collectionList={collectionList}
        setCollectionList={setCollectionList}
      />
    </Layout>
  );
}
