// controllers/uploadController.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { User } = require('../models/User');

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        await User.create({
          username: row.username,
          email: row.email,
          // Add other fields as needed
        });
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      res.status(200).json({ message: 'CSV file successfully processed' });
    });
};

module.exports = { uploadFile };
