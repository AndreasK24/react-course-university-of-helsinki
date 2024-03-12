import { useState } from "react";
import axios from "axios";

const useResource = (baseURL) => {
  const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
  };

  const create = async (newObject) => {
    const response = await axios.post(baseURL, newObject);
    return response.data;
  };

  const [value, setValue] = useState(getAll());

  const onChange = (event) => {
    event ? setValue(create(event.target.value)) : setValue("");
  };

  return [value, onChange];
};

export default useResource;
