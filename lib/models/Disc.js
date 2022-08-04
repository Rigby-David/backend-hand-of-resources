const pool = require('../utils/pool');

class Disc {
  id;
  name;
  type;
  speed;
  glide;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.speed = row.speed;
    this.glide = row.glide;
  }

  static async getAllDiscs() {
    const { rows } = await pool.query(
      'SELECT * FROM discs'
    );
    return rows.map((row) => new Disc(row));
  }
}

module.exports = { Disc };
