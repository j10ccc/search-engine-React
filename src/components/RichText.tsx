import { Typography } from "antd";
const { Text } = Typography;

export default function RichText(props: any) {
  const { plainText, keyWord } = props;
  const tmp = plainText.split(keyWord);

  return tmp.map((item: any, index: any) => {
    return (
      <span key={index}>
        {item}
        {index !== tmp.length - 1 ? <Text type="danger">{keyWord}</Text> : null}
      </span>
    );
  });
}
