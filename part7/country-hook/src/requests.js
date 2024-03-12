import axios from "axios";

export const getCountryData = (name) =>
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then((res) => {
      console.log("res.data", res.data);
      return res.data;
    });
