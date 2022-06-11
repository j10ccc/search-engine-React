import { Layout, Pagination, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ResultItem from "../../components/ResultItem";
import "./index.css";
import { useSessionStorageState } from "ahooks";
import RelatedList from "../../components/RelatedList";
import { useSearchParams } from "react-router-dom";
import { getRelatedAPI } from "../../api/related";
import { ExceptionStatusType } from "antd/lib/result";
import { getSearchResultAPI } from "../../api/search";
const { Content } = Layout;

export type ResultItemType = {
  id: number;
  title: string;
  url: string;
  content: string;
};
export type CollectionItem = {
  id: number;
  url: string;
  title: string;
  mark?: boolean;
};

// 每页的最大结果数量
const MAX_ITEM_NUMBER = 10;

export default function TextResult(props: any) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [resultList, setResultList] = useState<ResultItemType[]>();
  const [relatedList, setRelatedList] = useState<string[]>([]);
  const [filterList, setFilterList] =
    useSessionStorageState<string[]>("nmse-filter-list");
  const [searchParams] = useSearchParams();
  const { keyWord, setKeyWord } = props;
  const [loading, setLoading] = useState(true);

  function initialResultList(data: ResultItemType[]) {
    setResultList(
      data.map((item: ResultItemType) => {
        const pos = item.content.indexOf(keyWord);
        const reg = /[^A-Za-z0-9\u4e00-\u9fa5+]/g;
        let i = pos;
        for (i = pos; i > 0; i--) {
          if (reg.test(item.content[i])) break;
        }
        const content = item.content.slice(
          i + 1,
          i + 100 <= item.content.length ? pos + 100 : item.content.length
        );
        return {
          id: item.id,
          title: item.title,
          url: item.url,
          content: content.replace(/\s*/g, "")
        };
      })
    );
  }

  useEffect(() => {
    searchResult(getCombineContent(searchParams.get("word") || ""), 1);
  }, [searchParams, filterList]);
  // TODO: 删除挂钩地址栏搜索参数的搜索行为

  useEffect(() => {
    searchRelated(keyWord);
    // TODO: 相关搜索先请求
  }, []);

  function getCombineContent(keyword: string) {
    let content = keyWord;
    if (filterList !== undefined) {
      content += filterList?.map((item) => "-" + item).join("");
    }
    return content;
  }

  async function searchRelated(content: string) {
    getRelatedAPI(keyWord).then((res) => {
      if (res.data.data != null) setRelatedList(res.data.data);
      else setRelatedList([]);
    });
  }

  async function searchResult(content: string, paperNum: number) {
    getSearchResultAPI({
      word: content,
      paperNum
    })
      .then((res: any) => {
        initialResultList(
          res.data.data.Data.map((item: any) => {
            return {
              id: item.ID,
              title: item.Title,
              url: item.URL,
              content: item.Content
            };
          })
        );
        setTotal(res.data.data.Length);
      })
      .catch((err: ExceptionStatusType) => {
        console.log(err);
      });
    searchRelated(keyWord);
  }

  function handleFilterChange(content: string[]) {
    setFilterList(content);
  }
  function changePage(page: number) {
    document.querySelector(".result-content")?.scrollTo(0, 0);
    searchResult(keyWord, page);
    setPage(page);
  }

  return (
    <Content className="result-content" style={{ backgroundColor: "white" }}>
      <Space direction="vertical" size="small">
        <div className="align-content result-info">共找到 {total} 条结果</div>
        <Select
          open={false}
          className="align-content fit-width filter"
          mode="tags"
          defaultValue={filterList}
          placeholder="请输入过滤词"
          onChange={handleFilterChange}
        />
        <Space direction="vertical" size="small" className="align-content">
          {resultList?.slice(0, page * MAX_ITEM_NUMBER)?.map((item, index) => (
            <ResultItem
              item={item}
              key={index}
              index={index}
              keyWord={keyWord}
            />
          ))}
        </Space>
        {relatedList.length !== 0 ? (
          <RelatedList
            className="align-content fit-width"
            keyWord={keyWord}
            setKeyWord={setKeyWord}
            relatedList={relatedList}
            type="text"
          />
        ) : null}
        <Pagination
          current={page}
          hideOnSinglePage
          pageSize={MAX_ITEM_NUMBER}
          className="pagination align-content"
          defaultCurrent={1}
          total={total}
          showSizeChanger={false}
          onChange={changePage}
        />
      </Space>
    </Content>
  );
}
