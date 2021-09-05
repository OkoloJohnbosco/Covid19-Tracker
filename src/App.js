import React, { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  NativeSelect,
  Card,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import InfoBox from "./InfoBox";
import "./App.css";
import { uid } from "uid";
import PublicIcon from "@material-ui/icons/Public";
import Table from "./Table";
import { sortHighToLow, sortAlphabetically, cuttInNine } from "./utility";
import LineGraph from "./LineGraph";
import useGetCountryInfo from "./hooks/useGetCountryInfo";

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("worldwide");
  const [covidData, setCovidData] = useState(null);
  const [tableData, setTableData] = useState(null);
  useGetCountryInfo(country, setCovidData);

  const onCountryChange = (e) => setCountry(e.target.value);

  const sortByCases = () => {
    tableData && setTableData(sortHighToLow(tableData));
  };

  const sortAlphabeticallyHandler = () => {
    tableData && setTableData(sortAlphabetically(tableData));
  };

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
          setTableData(cuttInNine(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Calling the fxn
    getCountries();
  }, []);

  return (
    <div className="app">
      <div className="app__firstSection">
        <div className="app__header">
          <h1>Covid Tracker</h1>
          <FormControl className="app__select">
            <NativeSelect
              variant="standard"
              value={country}
              onChange={onCountryChange}
              IconComponent={PublicIcon}
            >
              <option value="worldwide" key="worldwide">
                Worldwide
              </option>
              {countries
                ? countries.map((country) => (
                    <option value={country.name} key={uid()}>
                      {country.name}
                    </option>
                  ))
                : null}
            </NativeSelect>
          </FormControl>
        </div>

        <div className="app__infoBox">
          <InfoBox
            title="Corona Virus Cases"
            cases={covidData?.todayCases}
            total={covidData?.cases}
          />
          <InfoBox
            title="Recovered"
            cases={covidData?.todayRecovered}
            total={covidData?.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={covidData?.todayDeaths}
            total={covidData?.deaths}
          />
        </div>
      </div>
      <div className="app__secondSection">
        <Card variant="outlined">
          <CardContent className="app__secondSectionInnerCard">
            <h3>Live Cases by Country</h3>
            <Button onClick={sortByCases}>Sort by Cases</Button>
            <Button onClick={sortAlphabeticallyHandler}>
              Sort Alphabetically
            </Button>

            {tableData && (
              <Table
                countries={tableData}
                countryName={country}
                setCountry={setCountry}
              />
            )}
            <h3>Worldwide new Cases</h3>
            <LineGraph />
          </CardContent>
        </Card>
      </div>

      {/* Maps */}
    </div>
  );
}

export default App;
