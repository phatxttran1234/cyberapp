// app.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const { connectAndSync } = require('./db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { uploadFile } = require('./controllers/uploadController');

const app = express();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use('/upload', upload.single('file'), uploadFile);

// Existing setup...
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Run database connection and synchronization
connectAndSync()
  .then(() => {
    console.log('Database connected and synchronized successfully.');
  })
  .catch(err => {
    console.error('Failed to connect and sync database:', err);
    process.exit(1);
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
