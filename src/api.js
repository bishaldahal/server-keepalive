/**
 * API routes for the server-keepalive application.
 */
const { getSarcasticMessage } = require('./utils');

/**
 * Sets up API routes for the Express app.
 * @param {Object} app - Express application instance
 */
function setupRoutes(app) {
  // Developer API endpoint returning sarcastic messages
  app.get('/api/developer', (req, res) => {
    try {
      const message = getSarcasticMessage();
      res.json(message);
    } catch (error) {
      console.error('Error in /api/developer:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

module.exports = { setupRoutes };