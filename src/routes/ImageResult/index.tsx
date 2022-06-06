import { useSessionStorageState } from "ahooks";
import { List, Image, Card, Space, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRelatedAPI } from "../../api/related";
import { getSearchImageResultAPI } from "../../api/searchImg";

export type ImageResultItem = {
  id: number;
  title: string;
  url: string;
};

export default function ImageResult(props: any) {
  const [page, setPage] = useState();
  const [resultList, setResultList] = useState<ImageResultItem[]>();
  const [relatedList, setRelatedList] = useState<string[]>();
  const [total, setTotal] = useState();
  const [searchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState(searchParams.get("word") || "");
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");

  useEffect(() => {
    getRelatedAPI(keyWord).then((res) => {
      if (res.data.data != null) setRelatedList(res.data.data);
    });
  }, []);

  useEffect(() => {
    searchImageResult(searchParams.get("word") || "", 1);
  }, [searchParams]);

  function searchImageResult(content: string, paperNum: number) {
    getSearchImageResultAPI({ word: keyWord, paperNum: 1 }).then((res: any) => {
      setResultList(
        res.data.data.Data.map((item: any) => {
          return {
            id: item.ID,
            url: item.URL,
            title: item.Title
          };
        })
      );
      setTotal(res.data.data.Data.length);
    });
  }
  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }

  return (
    <Content className="result-content">
      <Space direction="vertical" size="small">
        <div className="align-content result-info">共找到 {total} 条结果</div>
        {relatedList ? <RelatedList relatedList={relatedList} /> : null}
        <Select
          open={false}
          className="align-content fit-width filter"
          mode="tags"
          defaultValue={filterList}
          placeholder="请输入过滤词"
          onChange={handleFilterChange}
        />
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={resultList}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <Image src={item.url} />
              </Card>
            </List.Item>
          )}></List>
      </Space>
    </Content>
  );
}
