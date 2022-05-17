import { Switch, Layout } from "antd";
const { Header } = Layout;

export default function SEHeader(props: any) {
  const { darkMode, setDarkMode } = props;
  return (
    <Header>
      <Switch
        unCheckedChildren="🌞"
        checkedChildren="🌛"
        defaultChecked={darkMode}
        onChange={() => setDarkMode((state: any) => !state)}
      />
    </Header>
  );
}
