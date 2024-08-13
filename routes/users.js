const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { sequelize } = require('../db');


// Create a new user
router.post('/add', async (req, res) => {
  const { username, email } = req.body;

  try {
    // Using a transaction to ensure the operation is atomic
    const newUser = await sequelize.transaction(async (transaction) => {
      return await User.create({ username, email }, { transaction });
    });

    console.log('User created:', newUser.toJSON());
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Handle specific Sequelize error for unique constraint violations
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Error adding user: Username or email already exists.');
      res.status(409).json({ error: 'Username or email already exists' });
    } else {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      console.log('User exists:', user.toJSON());
      res.json(user);
    } else {
      console.log('User does not exist');
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error fetching user');
  }
});

module.exports = router;
