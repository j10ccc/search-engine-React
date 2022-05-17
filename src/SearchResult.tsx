import { Affix, Button, Input, Layout, Space, Tag } from "antd";
const { Header, Content } = Layout;
const { Search } = Input;

export type ResultItemType = {
  title: string;
  url: string;
  content: string;
};

export default function Result() {
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header style={{ display: "flex" }}>
          <Space>
            <Search />
            <Search />
          </Space>
        </Header>
      </Affix>

      <Content></Content>
    </Layout>
  );
}
