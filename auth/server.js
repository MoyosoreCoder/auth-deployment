// Import necessary modules
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Swagger
const { swaggerUi, specs } = require("./swagger"); // Correct import of swaggerUi and specs

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// Define the route for authentication
app.use('/api/auth', authRoutes);

// Swagger documentation route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Define the port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;
console.log("Environment loaded:", process.env.SECRET_KEY);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


// MongoDB connection setup
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb"; // Default Mongo URI for local development

// Check if Mongo URI is defined, if not, exit the app
if (!MONGO_URI) {
    console.log("❌ Mongo URI is not defined in the environment");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error", err);
    });
