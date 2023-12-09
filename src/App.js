import React, { useState } from "react";
import Forecast from "./components/forecast/forecast";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    // These URLs point to your Go server
    const currentWeatherFetch = fetch(`http://localhost:8080/weather?lat=${lat}&lon=${lon}`);
    const forecastFetch = fetch(`http://localhost:8080/forecast?lat=${lat}&lon=${lon}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
