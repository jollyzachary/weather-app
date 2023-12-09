package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func handleGeoData(w http.ResponseWriter, r *http.Request) {
	data, err := GetGeoData()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, data)
}

func handleWeatherData(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	data, err := GetWeatherData(lat, lon)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, data)
}

func handleForecast(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	data, err := GetForecastData(lat, lon)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, data)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/geo", handleGeoData)
	mux.HandleFunc("/weather", handleWeatherData)
	mux.HandleFunc("/forecast", handleForecast)

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
