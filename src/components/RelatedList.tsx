import { Button, Card, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function RelatedList(props: any) {
  const { relatedList } = props;

  function searchRelated(relatedWord: string) {
    window.location.href = "/search?word=" + relatedWord;
  }
  return (
    <Card
      title="相关搜索"
      bordered
      size="small"
      className="fit-width align-content">
      <Space wrap>
        {relatedList?.map((item: string, index: number) => {
          return (
            <Button
              shape="round"
              icon={<SearchOutlined />}
              key={index}
              onClick={() => searchRelated(item)}>
              {item}
            </Button>
          );
        })}
      </Space>
    </Card>
  );
}
