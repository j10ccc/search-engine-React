import { Card, Col, Rate, Row, Space, Typography } from "antd";
import { postCollectionAPI } from "../../api/postCollection";
import { LoginInfo, ResultItemType } from "../../pages/SearchResult";
import RichText from "../RichText";
import "./index.css";

const { Paragraph, Text } = Typography;
function RETitle(props: any) {
  const { title, url, keyWord } = props;
  const style = {
    fontSize: "1.4rem"
  };
  return (
    <Text ellipsis>
      <a href={url} style={style}>
        <RichText plainText={title} keyWord={keyWord} />
      </a>
    </Text>
  );
}

function REURL(props: any) {
  const { collectionList, setCollectionList } = LoginInfo.useContainer();
  const { item } = props;
  const { id, url, title } = item;
  const pattern: RegExp = /^(http:\/\/|https:\/\/)[^/]+\//;
  const baseURL = pattern
    .exec(url)![0]
    .slice(0, pattern.exec(url)![0].length - 1);
  const { onlineState } = LoginInfo.useContainer();
  let s: string = "";
  url
    .split(baseURL + "/")[1]
    .split("/")
    .forEach((item: string) => {
      s += " > " + item;
    });
  function onChange(value: number) {
    // 添加收藏
    if (value === 1) {
      postCollectionAPI({ id, url, title });
      setCollectionList((state: any) => {
        return [...state, { id, url, title, mark: true }];
      });
    }
    // 取消收藏
    else {
      setCollectionList(() =>
        collectionList?.filter((Item, Index) => id !== Item.id)
      );
    }
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
      {onlineState ? (
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
      ) : null}
    </Row>
  );
}

export default function ResultItem(props: any) {
  const { index, keyWord, mark } = props;
  const item: ResultItemType = props.item;
  return (
    <Card bordered={false} size="small" key={item.id} style={{ maxWidth: 600 }}>
      <Space direction="vertical" className="result-wrapper">
        <REURL item={item} index={index} mark={mark} />
        <RETitle title={item.title} url={item.url} keyWord={keyWord} />
        <Paragraph ellipsis={{ rows: 2 }}>
          <RichText plainText={item.content} keyWord={keyWord} />
        </Paragraph>
      </Space>
    </Card>
  );
}
