// const discs = require('../controllers/discs');
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

  static async getDiscById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM discs
      WHERE discs.id = $1
      GROUP BY discs.id`,
      [id]
    );
    return new Disc(rows[0]);
  }

  static async insert({ name, type, speed, glide }) {
    const { rows } = await pool.query(
      `
        INSERT INTO discs (name, type, speed, glide)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [name, type, speed, glide]
        
    );
    return new Disc(rows[0]);
  }
}
module.exports = { Disc };
