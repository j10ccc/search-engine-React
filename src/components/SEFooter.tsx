import { Button, Space } from "antd";
import React from "react";

const SEFooter = React.forwardRef((props, ref: any) => {
  const style = {
    padding: "1vw"
  };
  return (
    <div style={style} ref={ref}>
      <Space>
        <Button type="text">关于牛马</Button>
      </Space>
    </div>
  );
});

export default SEFooter;
