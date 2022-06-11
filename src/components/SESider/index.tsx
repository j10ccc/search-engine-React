import {
  Affix,
  Button,
  Drawer,
  Empty,
  List,
  Rate,
  Space,
  Typography
} from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./index.css";
import { LoginInfo } from "../../pages/SearchResult";
import { deleteCollectionAPI } from "../../api/deleteCollection";
import UserProfile from "../UserProfile";
import { getCollectionAPI } from "../../api/getCollection";
const { Text } = Typography;

export default function SESider(props: any) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const {
    onlineState,
    setOnlineState,
    collectionList,
    setCollectionList,
    userName
  } = LoginInfo.useContainer();

  useEffect(() => {
    if (userName) setOnlineState(true);
  }, []);
  useEffect(() => {
    if (onlineState) {
      getCollectionAPI().then((res) => {
        console.log(res.data.data);
        setCollectionList(
          res.data.data.data.map((item: any) => ({
            id: item.RawID,
            url: item.URL,
            title: item.Title,
            mark: true
          }))
        );
      });
    } else {
      setCollectionList([]);
    }
  }, [onlineState]);

  function onClose() {
    setDrawerVisible(false);
    if (collectionList) {
      const toDelete = collectionList
        .filter((item) => !item.mark)
        .map((item) => item.id);
      if (toDelete.length !== 0)
        deleteCollectionAPI({
          id: toDelete
        });
    }
    setCollectionList(() => collectionList?.filter((item) => item.mark));
  }
  function onChange(index: number) {
    setCollectionList(() =>
      collectionList?.map((item, i) => {
        if (i === index) {
          item.mark = !item.mark;
        }
        return item;
      })
    );
  }
  return (
    <>
      <Affix offsetBottom={10} className="drawer-switch">
        <Button
          shape="circle"
          type="primary"
          size="large"
          icon={<BarsOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}></Button>
      </Affix>
      <Drawer
        title="工具栏"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}>
        <Space direction="vertical" style={{ display: "flex" }}>
          <UserProfile
            onlineState={onlineState}
            setOnlineState={setOnlineState}
          />
          {onlineState ? (
            <List bordered size="small" header="收藏夹">
              {collectionList?.map((item, index) => (
                <List.Item key={index}>
                  <Text ellipsis>
                    <a href={item.url}>{item.title}</a>
                  </Text>
                  <Rate
                    count={1}
                    defaultValue={1}
                    value={item.mark ? 1 : 0}
                    onChange={() => onChange(index)}
                  />
                </List.Item>
              ))}
            </List>
          ) : (
            <Empty description="暂无收藏" />
          )}
        </Space>
      </Drawer>
    </>
  );
}
