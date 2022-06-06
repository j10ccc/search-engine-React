import { Typography } from "antd";
const { Text } = Typography;

export default function RichText(props: any) {
  const keyWord = decodeURI(location.href.split("?word=")[1]);
  const { plainText } = props;
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
