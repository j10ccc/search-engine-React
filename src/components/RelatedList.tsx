import { Button, Card, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function RelatedList(props: any) {
  const { relatedList } = props;
  const navigate = useNavigate();

  function onClick(content: string) {
    // navigate("/search?word=" + content, { replace: true });
    navigate("/");
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
              onClick={() => onClick(item)}>
              {item}
            </Button>
          );
        })}
      </Space>
    </Card>
  );
}
