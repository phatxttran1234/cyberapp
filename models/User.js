const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 255] // Add length validation for username
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Add email format validation
    }
  }
}, {
  tableName: 'Users', // Explicitly specify the table name
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
    {
      unique: true,
      fields: ['email']
    }
  ],
  timestamps: true, // Optional: include timestamps for createdAt and updatedAt
});

module.exports = User;