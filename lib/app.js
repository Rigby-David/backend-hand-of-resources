const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/discs', require('./controllers/discs'));
app.use('/pros', require('./controllers/pros'));
app.use('/courses', require('./controllers/courses'));
app.use('/movies', require('./controllers/movies'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
