const { Router } = require('express');
const { Pro } = require('../models/Pro');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pros = await Pro.getAllPros();
      res.json(pros);
    } catch (e) {
      next(e);
    }
  });
