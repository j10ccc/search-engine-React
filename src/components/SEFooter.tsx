import { Button, Space } from "antd";
import React from "react";

const SEFooter = (prop: any) => {
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
};

export default SEFooter;
