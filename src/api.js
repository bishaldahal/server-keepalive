/**
 * API routes for the server-keepalive application.
 */
const { getSarcasticMessage, formatUptime } = require("./utils");

/**
 * Sets up API routes for the Express app.
 * @param {Object} app - Express application instance
 */
function setupRoutes(app) {
  // Developer API endpoint returning sarcastic messages and system uptime
  app.get("/api/developer", (req, res) => {
    try {
      const message = getSarcasticMessage();
      const uptimeSeconds = process.uptime();
      res.json({
        ...message,
        system: {
          uptime: formatUptime(uptimeSeconds),
          timestamp: new Date().toISOString(),
          status: "operational",
        },
      });
    } catch (error) {
      console.error("Error in /api/developer:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

module.exports = { setupRoutes };
