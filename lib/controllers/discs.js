const { Router } = require('express');
const { Disc } = require('../models/Disc');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const discs = await Disc.getAllDiscs();
      res.json(discs);
    } catch (e) {
      next(e);
    }
  });
