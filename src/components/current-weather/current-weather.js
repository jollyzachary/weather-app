import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };
  return (
    <div className="weather">
      <div className="top">
        <div className="info">
          <p className="city">{data.city}</p>
          <p className="weatherDescription">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(kelvinToFahrenheit(data.main.temp))}°F</p>
        <div className="details">
          <div className="parameter-row details-header">
            <span className="parameter-label">Details</span>
            <div className="details-line"></div>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(kelvinToFahrenheit(data.main.feels_like))} °F</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} mph</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity} %</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} inHg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
