const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URI = "mongodb://localhost:27017/pizzeria";

    await mongoose.connect(MONGODB_URI);

    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
