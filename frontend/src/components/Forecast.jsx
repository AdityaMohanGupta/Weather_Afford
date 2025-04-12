import React from "react";
import { motion } from "framer-motion";

function Forecast({ forecast }) {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-semibold text-white text-center mb-6">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {forecast.map((day, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-2xl glass text-center text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-medium">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="weather icon"
              className="mx-auto my-2"
            />
            <p className="text-lg font-semibold">{day.temperature}°C</p>
            <p className="capitalize">{day.condition}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Forecast;
