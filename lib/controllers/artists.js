const { Router } = require('express');
const { Artist } = require('../models/Artist');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const artists = await Artist.getAllArtists();
      res.json(artists);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const artists = await Artist.getArtistById(req.params.id);
      res.json(artists);
    } catch(e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const artists = await Artist.insert(req.body);
      res.json(artists);
    } catch (e) {
      next(e);
    }
  });
