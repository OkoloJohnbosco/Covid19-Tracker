import { Card, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";
import CountUp from "react-countup";
const titleArr = [
  { title: "Corona Virus Cases", color: "purple" },
  { title: "Recovered", color: "green" },
  { title: "Deaths", color: "red" },
];

function InfoBox({ title, cases, total }) {
  const boxColor = title
    ? titleArr.find((a) => a.title === title)
    : { color: "transparent" };

  return (
    <Card className="infoBox" style={{ borderBottomColor: boxColor.color }}>
      <Typography className="infoBox__title" color="textSecondary" variant="h6">
        {title}
      </Typography>

      <h2 className="infoBox__cases">
        {cases || cases === 0 ? (
          <CountUp start={0} end={cases} duration={2.75} separator="," />
        ) : (
          "****"
        )}
      </h2>

      <Typography className="infoBox__total" color="textSecondary">
        {total ? (
          <CountUp start={0} end={total} duration={2.75} separator="," />
        ) : (
          "****"
        )}
      </Typography>
    </Card>
  );
}

export default InfoBox;
