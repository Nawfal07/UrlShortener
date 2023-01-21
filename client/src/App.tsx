import { Layout, Tabs } from "antd";
import type { TabsProps } from "antd";
import Shorten from "./components/Shorten";
import Redirect from "./components/Redirect";
import "./App.css";

const { Header, Footer, Content } = Layout;

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Shorten URL`,
    children: <Shorten />,
  },
  {
    key: "2",
    label: `Redirect to original`,
    children: <Redirect />,
  },
];

function App() {
  return (
    <>
      <Layout>
        <Header>
          <div className="logo">URL Shortener</div>
        </Header>
        <Content className="content">
          <Tabs defaultActiveKey="1" items={items} />
        </Content>
        <Footer className="footer">Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
