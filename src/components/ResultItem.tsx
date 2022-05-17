import { Card, Space } from "antd";
import RichText from "./RichText";

function RETitle(props: any) {
  const { title, url } = props;
  const style = {
    fontSize: "20px"
  };
  return (
    <a href={url} style={style}>
      {title}
    </a>
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
    <a href={url}>
      {(baseURL + s).length > 50 ? (
        <>
          <span style={{ color: "black" }}>{baseURL}</span>
          <span style={{ color: "gray" }}>
            {s.slice(0, 51 - baseURL.length)}...
          </span>
        </>
      ) : (
        <>
          <span style={{ color: "black" }}>{baseURL}</span>
          <span style={{ color: "gray" }}>{s}</span>
        </>
      )}
    </a>
  );
}

export default function ResultItem(props: any) {
  const { item } = props;
  return (
    <Card
      title={<REURL url={item.URL} />}
      bordered={false}
      size="small"
      style={{ width: 600 }}
      key={item.ID}>
      <Space direction="vertical">
        <RETitle title={item.Title} url={item.URL} />
        <RichText plainText={item.Content} />
      </Space>
    </Card>
  );
}
