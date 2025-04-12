import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${cityName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather for a default city on initial load
    fetchWeatherData('London');
  }, []);

  return (
    <div className="container">
      <div className="weather-dashboard">
        <h1>Weather Dashboard</h1>
        
        <SearchBar onSearch={fetchWeatherData} />
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && !error && (
          <div>
            <WeatherCard weather={weatherData.weather} />
            
            <div className="forecast-container">
              <h2 className="forecast-title">5-Day Forecast</h2>
              
              <div className="forecast-grid">
                {weatherData.forecast.map((day, index) => (
                  <ForecastCard key={index} forecast={day} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
