const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking_care", "root", "password", {
  host: "192.168.64.2",
  dialect: "mysql",
  logging: false,
});

// Option 3: Passing parameters separately (other dialects)
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
