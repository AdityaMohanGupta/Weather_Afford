import React from 'react';

const WeatherCard = ({ weather }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.city}, {weather.country}</h2>
        <p>{weather.description}</p>
      </div>
      
      <div className="weather-main">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="weather-icon"
        />
        <span className="temperature">{Math.round(weather.temperature)}°C</span>
      </div>
      
      <div className="weather-details">
        <div className="detail-card">
          <p className="detail-label">Feels Like</p>
          <p className="detail-value">{Math.round(weather.feelsLike)}°C</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{weather.humidity}%</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Wind Speed</p>
          <p className="detail-value">{weather.windSpeed} m/s</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{weather.pressure} hPa</p>
        </div>
      </div>
      
      <div className="weather-footer">
        <div>
          <p>Sunrise: {formatDate(weather.sunrise)}</p>
        </div>
        <div>
          <p>Sunset: {formatDate(weather.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 