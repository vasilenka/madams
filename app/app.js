const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
require('./database/connect-mongodb')();
// Hijack Mongoose Query
require('./services/redis-cache');

// Ignite the App
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'app/public')));

// Routes
require('./routes/_rest')(app);
require('./graphql/graphql')(app);

app.get('/test', function(req, res) {
    res.status(200).json({
        message: 'Connected to server'
    })
})

module.exports = app;
