import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function SearchBar({ setWeather, setForecast, setError, setLoading }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5`,
        {
          headers: {
            "X-RapidAPI-Key": "your_rapidapi_key",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      setSuggestions(response.data.data.map((city) => city.city));
    } catch (err) {
      console.error("Failed to fetch suggestions");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${city}`
      );
      setWeather(response.data.weather);
      setForecast(response.data.forecast);

      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(history));
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch weather data");
    }
    setLoading(false);
    setSuggestions([]);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className="flex justify-center mb-10 relative max-w-2xl mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full relative">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Search for a city..."
          className="w-full p-4 rounded-l-full glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {suggestions.length > 0 && (
          <motion.ul
            className="absolute w-full mt-2 glass rounded-lg shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                onClick={() => {
                  setCity(suggestion);
                  setSuggestions([]);
                }}
                className="p-3 text-white cursor-pointer hover:bg-blue-500/50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                {suggestion}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
      <motion.button
        type="submit"
        className="p-4 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>
    </motion.form>
  );
}

export default SearchBar;
