import { useState } from "react";
import { Layout, Input, Button, Descriptions } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import axios from "axios";

const { Header, Footer, Content } = Layout;

function App() {
  const [input, setInput] = useState("");
  const [shortURL, setShortURL] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await axios.post("/shorten", {
        originalURL: input,
      });
      if (result && result.data) {
        setShortURL(result.data.shortUrl);
        console.log(result.data.shortUrl);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Layout>
        <Header>
          <div className="logo">URL Shortener</div>
        </Header>
        <Content className="content">
          <div className="url-input my-5">
            <h3>URL to shorten</h3>
            <Input
              type="url"
              placeholder="Enter your url"
              value={input}
              onChange={handleChange}
              size="large"
            ></Input>
            <Button
              className="my-3 center"
              type="primary"
              size="large"
              onClick={handleClick}
            >
              Generate short link
            </Button>

            {shortURL && (
              <div>
                <h5>Your short URL</h5> <a href={shortURL}>{shortURL}</a>
              </div>
            )}
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
