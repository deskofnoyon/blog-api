const http = require("http");
const path = require("path");
const app = require("./app");
const { connectDB } = require("./db");
const logger = require("./config/logger");
require("dotenv").config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const PORT = process.env.PORT ?? 8080;

async function main() {
  try {
    // Establish database connection
    await connectDB();

    // Boot the server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error("Failed to start the application:", error);
    process.exit(1); // Exit the process with failure
  }
}

main();
