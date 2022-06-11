import { Divider, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
import { useSessionStorageState } from "ahooks";
import SELoading from "../../components/SELoading";
import SESider from "../../components/SESider";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import ImageResult, { resetImagePage } from "../../routes/ImageResult";
import TextResult from "../../routes/TextResult";
import { createContainer } from "unstated-next";
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

function useLoginHook() {
  const [onlineState, setOnlineState] = useState(false);
  const [userName, setUserName] = useSessionStorageState("nmse-user-info");
  const [collectionList, setCollectionList] = useState<CollectionItem[]>();
  return {
    onlineState,
    setOnlineState,
    userName,
    setUserName,
    collectionList,
    setCollectionList
  };
}
export const LoginInfo = createContainer(useLoginHook);

export default function SearchResult(prtops: any) {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");
  const [searchMode, setSearchMode] = useState("");

  const [searchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState(searchParams.get("word") || "");

  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf("image")) setSearchMode("image");
    setSearchMode("text");
    // setLoading(true);
    // TODO: ???
  }, []);

  return (
    <LoginInfo.Provider>
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
            <SEFooter />
          </Content>
        ) : (
          <SELoading />
        )}
        <SESider />
      </Layout>
    </LoginInfo.Provider>
  );
}
