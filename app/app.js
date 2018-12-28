const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// Connect to MongoDB
require('./database/connect-mongodb')();
// Hijack Mongoose Query
require('./services/redis-cache');

// Ignite the App
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(require('./services/allow-cors'));

// Require routes
require('./routes/_index')(app);

module.exports = app;
