import { Button, Card, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function RelatedList(props: any) {
  const { relatedList, type, setKeyWord } = props;
  const style = type === "text" ? "align-content fit-width" : "";
  const navigate = useNavigate();

  function onClick(content: string) {
    setKeyWord(content);
    document.querySelector(".result-content")?.scrollTo(0, 0);
    navigate(`/search${type === "text" ? "" : "/image"}?word=${content}`);
  }

  return (
    <Card title="相关搜索" bordered size="small" className={style}>
      <Space wrap={type === "text"}>
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
