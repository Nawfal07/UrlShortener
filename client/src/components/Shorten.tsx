import { useState } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Shorten = () => {
  const [input, setInput] = useState("");
  const [shortURL, setShortURL] = useState("");

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
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
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
          <h5>Your short URL</h5>{" "}
          <Link to={{ pathname: input }} target="_blank">
            {shortURL}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Shorten;
