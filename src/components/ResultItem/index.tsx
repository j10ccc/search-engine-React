import { Card, Col, Rate, Row, Space, Typography } from "antd";
import { postCollectionAPI } from "../../api/postCollection";
import { CollectionItem, ResultItemType } from "../../pages/SearchResult";
import RichText from "../RichText";
import "./index.css";

const { Paragraph, Text } = Typography;
function RETitle(props: any) {
  const { title, url } = props;
  const style = {
    fontSize: "1.4rem"
  };
  return (
    <Text ellipsis>
      <a href={url} style={style}>
        <RichText plainText={title} />
      </a>
    </Text>
  );
}

function REURL(props: any) {
  const { item, setCollectionList, uid } = props;
  const collectionList: CollectionItem[] = props.collectionList;
  const { id, url, title } = item;
  const pattern: RegExp = /^(http:\/\/|https:\/\/)[^/]+\//;
  const baseURL = pattern
    .exec(url)![0]
    .slice(0, pattern.exec(url)![0].length - 1);
  let s: string = "";
  url
    .split(baseURL + "/")[1]
    .split("/")
    .forEach((item: string) => {
      s += " > " + item;
    });
  function onChange(value: number) {
    if (value === 1) {
      postCollectionAPI({ id, url, title, uid });
      setCollectionList((state: CollectionItem[]) => {
        return [...state, { id, url, title, mark: true }];
      });
    } else
      setCollectionList(() =>
        collectionList.filter((Item, Index) => item.id !== Item.id)
      );
  }
  return (
    <Row align="bottom">
      <Col span={23}>
        <Text ellipsis className="fit-width">
          <a href={url} style={{ fontFamily: "monospace" }}>
            <span style={{ color: "black" }}>{baseURL}</span>
            <span style={{ color: "gray" }}>{s}</span>
          </a>
        </Text>
      </Col>
      <Col span={1}>
        <Rate
          count={1}
          value={
            collectionList?.filter(
              (Item, Index) => Item.id === item.id && Item.mark
            ).length
              ? 1
              : 0
          }
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}

export default function ResultItem(props: any) {
  const { index, collectionList, setCollectionList, uid } = props;
  const item: ResultItemType = props.item;
  return (
    <Card bordered={false} size="small" key={item.id} style={{ maxWidth: 600 }}>
      <Space direction="vertical" className="result-wrapper">
        <REURL
          item={item}
          index={index}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
          uid={uid}
        />
        <RETitle title={item.title} url={item.url} />
        <Paragraph ellipsis={{ rows: 2 }}>
          <RichText plainText={item.content} />
        </Paragraph>
      </Space>
    </Card>
  );
}
