import { Divider, Layout, Menu } from "antd";
import { useEffect, useRef, useState } from "react";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
import { useInViewport, useSessionStorageState } from "ahooks";
import SELoading from "../../components/SELoading";
import SESider from "../../components/SESider";
// import { getCollectionAPI } from "../../api/getCollection";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import ImageResult, { resetImagePage } from "../../routes/ImageResult";
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
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");
  const [uid, setUid] = useState(1);
  const [collectionList, setCollectionList] = useState<CollectionItem[]>();
  const [searchMode, setSearchMode] = useState("text");

  const [searchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState(searchParams.get("word") || "");

  const [updateImage, setUpdateImage] = useState(false);
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }
  useEffect(() => {
    setUpdateImage(true);
  }, [inViewport]);

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
      <SEHeader
        keyWord={keyWord}
        setKeyWord={setKeyWord}
        searchMode={searchMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {!loading ? (
        <Content
          className="result-content"
          style={{ overflowY: "scroll", backgroundColor: "white" }}>
          <Menu
            mode="horizontal"
            selectedKeys={[searchMode]}
            onSelect={({ key }) => {
              setSearchMode(key);
              resetImagePage();
            }}
            className="align-content">
            <Menu.Item key="text">
              <Link to={`/search?word=${keyWord}`}>文本</Link>
            </Menu.Item>
            <Menu.Item key="image">
              <Link to={`image?word=${keyWord}`}>图片</Link>
            </Menu.Item>
          </Menu>

          <Routes>
            <Route
              index
              element={
                <TextResult
                  filterList={filterList}
                  keyWord={keyWord}
                  setKeyWord={setKeyWord}
                  setLoading={setLoading}
                />
              }></Route>
            <Route
              path="image"
              element={
                <ImageResult
                  filterList={filterList}
                  keyWord={keyWord}
                  setKeyWord={setKeyWord}
                  updateImage={updateImage}
                  setUpdateImage={setUpdateImage}
                  setLoading={setLoading}
                />
              }></Route>
          </Routes>

          <Divider />
          <SEFooter ref={ref} />
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
