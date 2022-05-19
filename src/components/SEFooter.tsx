import { Button, Space } from "antd";

export default function SEFooter() {
  const style = {
    padding: "1vw"
  };
  return (
    <div style={style}>
      <Space>
        <Button type="text">关于牛马</Button>
      </Space>
    </div>
  );
}
