/**
 * Cron job logic for hitting internal and external APIs.
 */
const cron = require("node-cron");
const axios = require("axios");
const { sendPushNotification } = require("./notifications");

/**
 * Starts cron jobs to hit internal and external APIs.
 */
function startCronJobs() {
  const HOSTED_DOMAIN = process.env.HOSTED_DOMAIN;
  const EXTERNAL_APIS = process.env.EXTERNAL_APIS
    ? process.env.EXTERNAL_APIS.split(",").map((api) => api.trim())
    : [];

  // Schedule cron job every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running cron job...");

    // Hit internal API
    try {
      const response = await axios.get(`${HOSTED_DOMAIN}/api/developer`, {
        timeout: 5000,
      });
      console.log("Internal API response:", response.data);
    } catch (error) {
      console.error("Error hitting internal API:", error.message);
    }

    // Hit external APIs
    for (const api of EXTERNAL_APIS) {
      try {
        const response = await axios.get(api, { timeout: 5000 });
        console.log(`External API ${api} is up:`, response.status);
      } catch (error) {
        console.error(`External API ${api} is down:`, error.message);
        await sendPushNotification(
          `API ${api} is down! Error: ${error.message}`
        );
      }
    }
  });
}

module.exports = { startCronJobs };
