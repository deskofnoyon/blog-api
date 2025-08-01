const mongoose = require("mongoose");

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @async
 * @function connectDB
 * @throws Will terminate the process with an exit code of 1 if the connection fails.
 * @returns {Promise<void>} Resolves when the connection is successfully established.
 *
 * Environment Variables:
 * - `MONGO_URI` (string): The MongoDB connection URI.
 * - `DB_NAME` (string): The name of the database to connect to.
 *
 * Logs:
 * - Logs a success message with the connected database name on successful connection.
 * - Logs an error message if the connection fails.
 */
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${connectionInstance.connection.name}`);
    // await seedAdmin();
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
