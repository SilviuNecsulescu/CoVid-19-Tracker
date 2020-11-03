import React from "react";
import "../css/Table.css";
import numeral from "numeral";
function Table({ tableData }) {
  return (
    <table className="table">
      <tbody>
        {tableData &&
          tableData.map(({ country, cases }, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td>{numeral(cases).format("0,0")}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
