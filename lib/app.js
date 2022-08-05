const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes
app.use('/discs', require('./controllers/discs'));
app.use('/pros', require('./controllers/pros'));
app.use('/courses', require('./controllers/courses'));
app.use('/movies', require('./controllers/movies'));
app.use('/artists', require('./controllers/artists'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
