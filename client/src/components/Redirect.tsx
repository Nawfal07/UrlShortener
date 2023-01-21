import { useState } from "react";
import { Input, Button, Alert } from "antd";
import axios from "axios";

const Redirect = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await axios.get(input);
      console.log(result);
      if (result && result.data) {
        window.location.href = result.data.data;
      } else {
        setError("Oops,cannot find this link !");
      }
    } catch (error) {
      setError("Oops, cannot find this link !");
    }
  };

  return (
    <div className="url-input my-5">
      <h3>Use your short link</h3>
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
        Let's dive
      </Button>
      {error && <Alert message={error} type="error" />}
    </div>
  );
};

export default Redirect;
