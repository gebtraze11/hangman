require('dotenv').config();
require('./config/database');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express()

// Middleware
app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Routes
const apiRouter = require('./routes/api');
const usersApiRouter = require('./routes/users');

app.use('/api', apiRouter);
app.use('/', usersApiRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`App is listening on ${port}`)
})






