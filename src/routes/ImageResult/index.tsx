import { useSessionStorageState } from "ahooks";
import { List, Image, Card, Space, Select, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchImageResultAPI } from "../../api/searchImg";
// import { getRelatedAPI } from "../../api/related";
// import RelatedList from "../../components/RelatedList";
import RichText from "../../components/RichText";
const { Text } = Typography;

export type ImageResultItem = {
  id: number;
  title: string;
  url: string;
};

let imagePage = 0;
export function resetImagePage() {
  imagePage = 0;
}
export default function ImageResult(props: any) {
  const [resultList, setResultList] = useState<ImageResultItem[]>([]);
  // const [relatedList, setRelatedList] = useState<string[]>();
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const { keyWord, updateImage, setUpdateImage } = props;
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");

  /*   useEffect(() => {
    getRelatedAPI(keyWord).then((res) => {
      if (res.data.data != null) setRelatedList(res.data.data);
    });
  }, []);
 */

  useEffect(() => {
    if (updateImage === true && resultList.length < total) {
      searchImageResult(getCombineContent(keyWord));
      setUpdateImage(false);
    }
  }, [updateImage]);

  useEffect(() => {
    if (searchParams.get("word") && searchParams.get("word")?.length !== 0)
      searchImageResult(getCombineContent(searchParams.get("word") || ""));
  }, [searchParams]);

  async function searchImageResult(content: string) {
    getSearchImageResultAPI({ word: content, paperNum: ++imagePage }).then(
      (res: any) => {
        if (res.data.data.Data != null)
          setResultList((state) =>
            state.concat(
              res.data.data.Data.map((item: any) => {
                return {
                  id: item.ID,
                  url: item.URL,
                  title: item.Title
                };
              })
            )
          );
        setTotal(res.data.data.Length);
        setUpdateImage(false);
      }
    );
  }
  function getCombineContent(keyword: string) {
    let content = keyWord;
    if (filterList !== undefined) {
      content += filterList?.map((item) => "-" + item).join("");
    }
    return content;
  }

  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }

  return (
    <Content className="result-content">
      <Space direction="vertical" size="small">
        {/* <div className="align-content result-info">共找到 {total} 条结果</div> */}
        <Select
          open={false}
          className="align-content fit-width filter"
          mode="tags"
          defaultValue={filterList}
          placeholder="请输入过滤词"
          onChange={handleFilterChange}
        />
        <List
          grid={{ column: 5 }}
          dataSource={resultList}
          renderItem={(item) => (
            <List.Item>
              <Card bordered={false}>
                <Image src={item.url} />
                <Text ellipsis>
                  <RichText plainText={item.title} keyWord={keyWord} />
                </Text>
              </Card>
            </List.Item>
          )}></List>
      </Space>
    </Content>
  );
}
