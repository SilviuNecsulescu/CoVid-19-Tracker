import React from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState([46, 25]);
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries?sort=cases")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country, index) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: index,
          }));
          setTableData(data);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getWorldWideData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    getWorldWideData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const apiURL =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        if (countryCode !== "worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(3);
        }
        setCountry(countryCode);
      });
  };

  const handleInfoBoxClick = (data) => {
    setCasesType(data);
  };

  return (
    <div className="app">
      <div className="app__mainContent">
        <MainContent
          handleInfoBoxClick={handleInfoBoxClick}
          casesType={casesType}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          mapCountries={mapCountries}
          countries={countries}
          country={country}
          countryInfo={countryInfo}
          onCountryChange={onCountryChange}
        />
      </div>

      <div className="app__sidebar">
        <Sidebar casesType={casesType} tableData={tableData} />
      </div>
    </div>
  );
}

export default App;
