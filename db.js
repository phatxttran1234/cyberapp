const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Create a new Sequelize instance with the database connection parameters
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Change to console.log if you want to log SQL queries
  }
);

// Function to authenticate and sync models with the database
const connectAndSync = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const User = require('./models/User');
    const Post = require('./models/Post');

    // Sync models with the database
    await sequelize.sync({ force: process.env.DB_FORCE_SYNC === 'true' });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Ensure the error is thrown so it can be caught by the caller
  }
};

// Export the Sequelize instance and the connectAndSync function
module.exports = { sequelize, connectAndSync };