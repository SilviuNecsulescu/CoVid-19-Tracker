import React from "react";
import "../css/Sidebar.css";
import { Card } from "@material-ui/core";
import Table from "./Table";
import LineGraph from "./LineGraph";

function Sidebar({ tableData, casesType }) {
  return (
    <Card className="sidebar">
      <h3>Live cases by country</h3>
      <Table tableData={tableData} />
      <h3>Worldwide new {casesType}</h3>
      <LineGraph casesType={casesType} />
    </Card>
  );
}

export default Sidebar;
