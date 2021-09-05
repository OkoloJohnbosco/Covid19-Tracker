import { useEffect } from "react";
import axios from "axios";

function useGetCountryInfo(country, callBackFxn) {
  useEffect(() => {
    const getCountryInfo = (country) => {
      const url =
        country === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${country}`;
      axios
        .get(url)
        .then((response) => {
          callBackFxn(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCountryInfo(country);
  }, [country, callBackFxn]);

  return;
}

export default useGetCountryInfo;
