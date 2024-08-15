const app = require('./app'); // Import the Express app
const port = process.env.PORT || 3000; // Use environment port or default to 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
