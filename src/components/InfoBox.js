import React from "react";
import "../css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ isRed, active, title, cases, total, ...props }) {
  return (
    <Card
      className={`infoBox  ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h3 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h3>
        <Typography className="infoBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
