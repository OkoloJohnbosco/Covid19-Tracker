import React from "react";
import "./Table.css";
import { uid } from "uid";

function Table({ countries, setCountry, countryName }) {
  const changeCountry = (isoNumber) => {
    console.log(isoNumber);
    setCountry(isoNumber);
  };

  return (
    <div className="table__wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(({ cases, country }) => (
            <tr
              key={uid()}
              onClick={() => changeCountry(country)}
              className={countryName === country ? "vikky__color" : ""}
            >
              <td>{country}</td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
