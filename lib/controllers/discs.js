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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const discs = await Disc.getDiscById(req.params.id);
      res.json(discs);
    } catch(e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const discs = await Disc.insert(req.body);
      res.json(discs);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const discs = await Disc.updateById(req.params.id, req.body);
      res.json(discs);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const discs = await Disc.delete(req.params.id);
      res.json(discs);
    } catch (e) {
      next(e);
    }
  });
