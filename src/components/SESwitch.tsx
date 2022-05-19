import { Switch } from "antd";

export default function SESwitch(props: any) {
  const { darkMode, setDarkMode } = props;
  return (
    <Switch
      unCheckedChildren="🌞"
      checkedChildren="🌛"
      defaultChecked={darkMode}
      onChange={() => setDarkMode((state: any) => !state)}
    />
  );
}
