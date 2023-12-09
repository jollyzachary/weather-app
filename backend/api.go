package main

import (
	"io/ioutil"
	"net/http"
)

const (
	GeoAPIURL     = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities"
	WeatherAPIURL = "https://api.openweathermap.org/data/2.5/"
	GeoAPIKey     = "725da61bb4msha62f16f9088c9f5p149bacjsn64878ab1e119"
	WeatherAPIKey = "6fd10402011053133439086242243d8e"
)

func GetGeoData() (string, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", GeoAPIURL, nil)
	if err != nil {
		return "", err
	}

	req.Header.Add("X-RapidAPI-Key", GeoAPIKey)
	req.Header.Add("X-RapidAPI-Host", "wft-geo-db.p.rapidapi.com")

	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func GetWeatherData(lat, lon string) (string, error) {
	weatherURL := WeatherAPIURL + "weather?lat=" + lat + "&lon=" + lon + "&appid=" + WeatherAPIKey + "&units=imperial"
	resp, err := http.Get(weatherURL)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func GetForecastData(lat, lon string) (string, error) {
	forecastURL := WeatherAPIURL + "forecast?lat=" + lat + "&lon=" + lon + "&appid=" + WeatherAPIKey + "&units=imperial"
	resp, err := http.Get(forecastURL)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
