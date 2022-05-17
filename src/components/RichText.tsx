export default function RichText(props: any) {
  const keyWord = location.href.split("?word=")[1];
  const { plainText } = props;
  return <span>{plainText.slice(0, 120)}...</span>;
}
