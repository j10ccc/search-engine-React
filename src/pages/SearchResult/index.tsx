import { Divider, Layout, Menu, Pagination, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getRelatedAPI } from "../../api/related";
import { getSearchResultAPI } from "../../api/search";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
import { useSessionStorageState } from "ahooks";
import SELoading from "../../components/SELoading";
import SESider from "../../components/SESider";
// import { getCollectionAPI } from "../../api/getCollection";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import ImageResult from "../../routes/ImageResult";
import TextResult from "../../routes/TextResult";
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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");
  const [uid, setUid] = useState(1);
  const [collectionList, setCollectionList] = useState<CollectionItem[]>();

  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get("word") || "";

  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }

  let isRequested = false;
  useEffect(() => {
    if (!isRequested) {
      // setLoading(true);
      /* getCollectionAPI(uid).then((res) => {
        console.log(res.data.data);
        setCollectionList(
          res.data.data.data.map((item: any) => ({
            id: item.id,
            url: item.url,
            title: item.title,
            mark: true
          }))
        );
      }); */
    }
    isRequested = true;
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <SEHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      {!loading ? (
        <Content
          className="result-content"
          style={{ overflowY: "scroll", backgroundColor: "white" }}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["text"]}
            className="align-content">
            <Menu.Item key="text">
              <Link to={"/search?word=" + keyWord}>文本</Link>
            </Menu.Item>
            <Menu.Item key="image">
              <Link to={`image?word=${keyWord}`}>图片</Link>
            </Menu.Item>
          </Menu>

          <Routes>
            <Route
              index
              element={<TextResult filterList={filterList} />}></Route>
            <Route
              path="image"
              element={<ImageResult filterList={filterList} />}></Route>
          </Routes>

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
