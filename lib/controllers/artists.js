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
  });
