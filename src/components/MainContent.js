import React from "react";
import "../css/MainContent.css";
import { FormControl, MenuItem, Select, Card } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "../utils/utils";
import numeral from "numeral";

function MainContent({
  handleInfoBoxClick,
  casesType,
  mapZoom,
  mapCenter,
  mapCountries,
  countries,
  country,
  countryInfo,
  onCountryChange,
}) {
  return (
    <Card className="mainContent">
      <div className="mainContent__header">
        <h1 className="mainContent__title">CoVid 19 Tracker</h1>
        <FormControl className="mainContent__dropdown">
          <Select value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries &&
              countries.map(({ name, value, id }) => (
                <MenuItem key={id} value={value}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="mainContent__stats">
        <InfoBox
          onClick={() => handleInfoBoxClick("cases")}
          title="Coronavirus Cases"
          isRed
          active={casesType === "cases"}
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}
        />
        <InfoBox
          onClick={() => handleInfoBoxClick("recovered")}
          title="Recovered"
          active={casesType === "recovered"}
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}
        />
        <InfoBox
          onClick={() => handleInfoBoxClick("deaths")}
          title="Deaths"
          isRed
          active={casesType === "deaths"}
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}
        />
      </div>

      <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
      />
    </Card>
  );
}

export default MainContent;
