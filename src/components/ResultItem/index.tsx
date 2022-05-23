import { Card, Space, Typography } from "antd";
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
  const { url } = props;
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
  return (
    <Text ellipsis style={{ width: "400px" }}>
      <a href={url} style={{ fontFamily: "monospace" }}>
        <>
          <span style={{ color: "black" }}>{baseURL}</span>
          <span style={{ color: "gray" }}>{s}</span>
        </>
      </a>
    </Text>
  );
}

export default function ResultItem(props: any) {
  const { item } = props;
  return (
    <Card bordered={false} size="small" key={item.ID} style={{ maxWidth: 600 }}>
      <Space direction="vertical" className="result-wrapper">
        <REURL url={item.URL} />
        <RETitle title={item.Title} url={item.URL} />
        <Paragraph ellipsis={{ rows: 2 }}>
          <RichText plainText={item.Content} />
        </Paragraph>
      </Space>
    </Card>
  );
}
