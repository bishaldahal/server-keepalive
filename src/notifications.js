/**
 * Push notification logic using Expo SDK.
 */
const { Expo } = require("expo-server-sdk");

const expo = new Expo();
const PUSH_TOKENS = process.env.PUSH_TOKENS
  ? process.env.PUSH_TOKENS.split(",").map((token) => token.trim())
  : [];

/**
 * Sends a push notification via Expo.
 * @param {string} message - The notification message
 */
async function sendPushNotification(message) {
  try {
    const messages = PUSH_TOKENS.filter((token) =>
      Expo.isExpoPushToken(token)
    ).map((token) => ({
      to: token,
      sound: "default",
      body: message,
      data: { withSome: "data" },
    }));

    if (messages.length === 0) {
      console.warn("No valid push tokens provided");
      return;
    }

    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
      console.log("Push notification sent:", message);
    }
  } catch (error) {
    console.error("Error sending push notification:", error.message);
  }
}

module.exports = { sendPushNotification };
