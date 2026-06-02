const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, ".next");

if (fs.existsSync(nextDir)) {
  console.log("Cleaning Next.js compilation cache (.next)...");
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("Successfully cleared cache!");
  } catch (err) {
    console.error("Failed to clear .next cache:", err.message);
  }
} else {
  console.log("No .next cache directory found, skipping clean.");
}
