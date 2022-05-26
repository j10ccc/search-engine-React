import { Alert, Spin } from "antd";

export default function setLoading() {
  return (
    <div className="align-content loading fit-width">
      <Spin tip="Loading">
        <Alert message="加载中" description="后台正在全力加载中" />
      </Spin>
    </div>
  );
}
