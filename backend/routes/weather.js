const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeCache = require("node-cache");

// Create a new cache instance with a TTL of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

// Input validation middleware
const validateCity = (req, res, next) => {
  const { city } = req.query;
  if (!city || typeof city !== 'string' || city.trim() === '') {
    return res.status(400).json({ 
      error: "City is required and must be a non-empty string",
      details: "Please provide a valid city name"
    });
  }
  next();
};

router.get("/", validateCity, async (req, res) => {
  const { city } = req.query;
  const cacheKey = `weather_${city.toLowerCase()}`;

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Returning cached data for ${city}`);
    return res.json(cachedData);
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  if (!API_KEY) {
    console.error("API Key is missing");
    return res.status(500).json({ 
      error: "Server configuration error",
      details: "OpenWeather API key is not configured"
    });
  }

  try {
    console.log(`Fetching weather for city: ${city}`);

    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
    ]);

    const weatherData = {
      city: weatherResponse.data.name,
      country: weatherResponse.data.sys.country,
      temperature: weatherResponse.data.main.temp,
      feelsLike: weatherResponse.data.main.feels_like,
      condition: weatherResponse.data.weather[0].main,
      description: weatherResponse.data.weather[0].description,
      icon: weatherResponse.data.weather[0].icon,
      humidity: weatherResponse.data.main.humidity,
      windSpeed: weatherResponse.data.wind.speed,
      pressure: weatherResponse.data.main.pressure,
      visibility: weatherResponse.data.visibility,
      sunrise: weatherResponse.data.sys.sunrise,
      sunset: weatherResponse.data.sys.sunset,
      timestamp: Date.now()
    };

    const forecastData = forecastResponse.data.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        pressure: item.main.pressure
      }));

    const responseData = { 
      weather: weatherData, 
      forecast: forecastData,
      lastUpdated: new Date().toISOString()
    };

    // Cache the response
    cache.set(cacheKey, responseData);

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    if (error.response) {
      console.error("API error response:", error.response.data);
      if (error.response.status === 404) {
        res.status(404).json({ 
          error: "City not found",
          details: "Please check the city name and try again"
        });
      } else if (error.response.status === 401) {
        res.status(401).json({ 
          error: "Invalid API key",
          details: "Please contact the administrator"
        });
      } else {
        res.status(error.response.status).json({ 
          error: "Weather API error",
          details: error.response.data.message || "Unknown error occurred"
        });
      }
    } else if (error.request) {
      res.status(503).json({ 
        error: "Service unavailable",
        details: "Could not connect to the weather service"
      });
    } else {
      res.status(500).json({ 
        error: "Server error",
        details: "An unexpected error occurred"
      });
    }
  }
});

module.exports = router;
