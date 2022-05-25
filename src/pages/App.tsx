import { Layout, Input } from "antd";
import { Link } from "react-router-dom";
import SEFooter from "../components/SEFooter";
import "./App.css";
const { Content } = Layout;
const { Search } = Input;

export default function App() {
  // const [darkMode, setDarkMode] = useState(true);
  sessionStorage.clear();
  function onSearch(value: string) {
    window.location.href = "/search?word=" + value;
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <div className="search-area">
          <h1>图片</h1>
          <Search
            enterButton={<Link to="/search">牛马一下</Link>}
            size="large"
            onSearch={onSearch}
          />
        </div>
      </Content>
      <SEFooter />
    </Layout>
  );
}
