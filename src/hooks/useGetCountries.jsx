import { useState, useEffect } from "react";
import axios from "axios";

function useGetCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = () => {
      axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          const countries = response.data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          //   setTableData(cuttInNine(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCountries();
  }, []);

  return countries;
}

export default useGetCountries;
