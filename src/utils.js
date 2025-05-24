/**
 * Utility functions for the server-keepalive application.
 */

/**
 * Validates required environment variables.
 * @throws {Error} If required environment variables are missing
 */
function validateEnv() {
  const required = ["HOSTED_DOMAIN"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

/**
 * Returns a random sarcastic developer message.
 * @returns {Object} A sarcastic message object
 */
function getSarcasticMessage() {
  const sarcasticMessages = [
    {
      message:
        "Just fixed a bug... by creating three new ones. Classic dev life.",
    },
    {
      message:
        "I love it when the client says 'it’s a small change.' Spoiler: It’s never small.",
    },
    { message: "My code works... until someone actually uses it." },
    {
      message:
        "Why test locally when production is the ultimate QA environment?",
    },
    {
      message:
        "Coffee’s brewing, bugs are multiplying. Another day in paradise.",
    },
    { message: "Documentation? Oh, you mean my future self’s treasure hunt." },
    { message: "I didn’t break the build. It was... team spirit." },
    { message: "Stack Overflow is basically my second brain at this point." },
    { message: "The deadline was yesterday, but my code’s still in tomorrow." },
    { message: "Null pointer exception? More like my life’s default state." },
    {
      message:
        "I don’t always write bugs, but when I do, they’re in production.",
    },
    { message: "Refactoring code is like cleaning my room: I’ll do it later." },
    { message: "The client wants it done by EOD. Laughs in 80-hour workweek." },
    { message: "My code’s not broken, it’s just... creatively functional." },
    { message: "Who needs sleep when you have 47 browser tabs open?" },
    {
      message: "Unit tests? I prefer the live-in-production testing strategy.",
    },
    { message: "Git blame says it’s my fault. Git blame is a liar." },
    { message: "I turned it off and on again. Still broken. Send help." },
    { message: "CSS is my nemesis, but we’re in a toxic relationship." },
    {
      message:
        "I’m not arguing with the compiler. I’m just... strongly suggesting.",
    },
  ];
  return sarcasticMessages[
    Math.floor(Math.random() * sarcasticMessages.length)
  ];
}

module.exports = { validateEnv, getSarcasticMessage };
