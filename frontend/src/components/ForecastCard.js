import React from 'react';

const ForecastCard = ({ forecast }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast-card">
      <p className="forecast-day">{formatDate(forecast.date)}</p>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.condition}
        className="forecast-icon"
      />
      <p className="forecast-temp">{Math.round(forecast.temperature)}°C</p>
      <p className="forecast-desc">{forecast.description}</p>
      
      <div className="forecast-details">
        <div className="forecast-detail">
          <span>Feels Like</span>
          <span>{Math.round(forecast.feelsLike)}°C</span>
        </div>
        <div className="forecast-detail">
          <span>Humidity</span>
          <span>{forecast.humidity}%</span>
        </div>
        <div className="forecast-detail">
          <span>Wind</span>
          <span>{forecast.windSpeed} m/s</span>
        </div>
        <div className="forecast-detail">
          <span>Pressure</span>
          <span>{forecast.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard; 