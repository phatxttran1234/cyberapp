// importData.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { User } = require('./models/User'); // Import your Sequelize model

const importData = async () => {
  const filePath = path.join(__dirname, 'new.csv'); // Path to your CSV file

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
    });
};

importData();
