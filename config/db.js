const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDb = process.env.MONGO_URL;

async function main() {
  const conn = await mongoose.connect(mongoDb);
  console.log(`MongoBD connected: ${conn.connection.host}`);
}

module.exports = main;
