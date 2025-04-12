const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
const weatherRoutes = require("./routes/weather");

const envPath = require("path").resolve(__dirname, ".env");
console.log("Looking for .env at:", envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Error loading .env:", result.error);
} else {
  console.log(".env loaded successfully");
}

console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("OPENWEATHER_API_KEY:", process.env.OPENWEATHER_API_KEY);

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all routes
app.use(limiter);

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Routes
app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Weather API is running",
    version: "1.0.0",
    endpoints: {
      weather: "/api/weather?city=YOUR_CITY"
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
