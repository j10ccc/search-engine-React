import { Affix, Button, Drawer, List, Rate, Space, Typography } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./index.css";
import { CollectionItem } from "../../pages/SearchResult";
import { deleteCollectionAPI } from "../../api/deleteCollection";
const { Text } = Typography;

export default function SESider(props: any) {
  const { setCollectionList, uid } = props;
  const collectionList: CollectionItem[] = props.collectionList;
  const [drawerVisible, setDrawerVisible] = useState(false);

  function onClose() {
    setDrawerVisible(false);
    deleteCollectionAPI({
      uid,
      id: collectionList.filter((item) => !item.mark).map((item) => item.id)
    });

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
        title="收藏夹"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}>
        <Space direction="vertical" style={{ display: "flex" }}>
          <List bordered size="small" header="$ 收藏夹名称 $">
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
        </Space>
      </Drawer>
    </>
  );
}
