/**
 * Main entry point for the server-keepalive application.
 * Sets up the Express server and initializes cron jobs.
 */
require('dotenv').config();
const express = require('express');
const { setupRoutes } = require('./api');
const { startCronJobs } = require('./cron');
const { validateEnv } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Validate environment variables
validateEnv();

// Middleware
app.use(express.json());

// Setup routes
setupRoutes(app);

// Start cron jobs
startCronJobs();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});