import React from "react";
import { motion } from "framer-motion";

function WeatherCard({ weather }) {
  const getWeatherBackground = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "bg-gradient-to-br from-yellow-300 to-orange-400";
      case "clouds":
        return "bg-gradient-to-br from-gray-300 to-blue-400";
      case "rain":
        return "bg-gradient-to-br from-blue-500 to-gray-600";
      default:
        return "bg-gradient-to-br from-blue-400 to-purple-500";
    }
  };

  return (
    <motion.div
      className={`p-8 rounded-3xl glass shadow-2xl max-w-md mx-auto ${getWeatherBackground(
        weather.condition
      )}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-3xl font-semibold text-white text-center">
        {weather.city}
      </h2>
      <motion.img
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
        className="mx-auto my-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <p className="text-5xl font-bold text-white text-center">
        {weather.temperature}°C
      </p>
      <p className="text-xl text-white text-center capitalize">
        {weather.condition}
      </p>
      <div className="flex justify-between mt-6 text-white">
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {weather.windSpeed} m/s</p>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
