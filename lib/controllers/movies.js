const { Router } = require('express');
const { Movie } = require('../models/Movie');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const movies = await Movie.getAllMovies();
      res.json(movies);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const movies = await Movie.getMovieById(req.params.id);
      res.json(movies);
    } catch(e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const movies = await Movie.insert(req.body);
      res.json(movies);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const movies = await Movie.updateById(req.params.id, req.body);
      res.json(movies);
    } catch (e) {
      next(e);
    }
  });
