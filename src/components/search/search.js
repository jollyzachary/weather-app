import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => { // Ensure onSearchChange is destructured
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    const query = new URLSearchParams({
      minPopulation: 5000,
      namePrefix: inputValue,
      limit: 10 // Adjust the limit as needed
    }).toString();
  
    const url = `${GEO_API_URL}?${query}`;
  
    return fetch(url, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            // Construct the label with city, region, and country
            const label = `${city.name}, ${city.regionCode}, ${city.countryCode}`;
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: label
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  
  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData); // Pass searchData to onSearchChange
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />

  );
};

export default Search;
