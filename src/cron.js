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

  // Common headers to simulate a typical browser user
  const commonHeaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    DNT: "1",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Sec-CH-UA": '"Chromium";v="123", "Not:A-Brand";v="8"',
    "Sec-CH-UA-Mobile": "?0",
    "Sec-CH-UA-Platform": '"Windows"',
    Referer: HOSTED_DOMAIN,
    Origin: HOSTED_DOMAIN,
  };

  // Schedule cron job every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running cron job...");

    // Hit internal API
    try {
      const response = await axios.get(`${HOSTED_DOMAIN}/api/developer`, {
        timeout: 5000,
        headers: commonHeaders,
      });
      console.log("Internal API response:", response.data);
    } catch (error) {
      console.error("Error hitting internal API:", error.message);
    }

    // Hit external APIs
    for (const api of EXTERNAL_APIS) {
      try {
        const response = await axios.get(api, {
          timeout: 30000,
          headers: {
            ...commonHeaders,
            Referer: api,
            Origin: api,
            "Sec-Fetch-Site": "cross-site",
          },
        });
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
