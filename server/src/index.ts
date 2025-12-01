import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/rideforyou";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Routes
app.get("/", (req, res) => {
  res.json({ message: "RideForYou API is running!" });
});

app.get("/api/bus", (req, res) => {
  res.json({ 
    eta: "4 mins", 
    route: 42,
    nextStop: "Downtown Station",
    currentLocation: { lat: 40.7128, lng: -74.0060 }
  });
});

app.get("/api/buses", (req, res) => {
  res.json({
    buses: [
      { id: 1, route: 42, eta: "4 mins", destination: "Downtown" },
      { id: 2, route: 15, eta: "12 mins", destination: "Airport" },
      { id: 3, route: 8, eta: "7 mins", destination: "Central Park" }
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});