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
    if (rows.length === 0) {
      return null;
    }
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

  static async updateById(id, newAttrs) {
    const disc = await Disc.getDiscById(id);
    if (!disc) return null;
    const updatedDisc = { ...disc, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE discs
        SET name = $2, type = $3, speed = $4, glide = $5
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedDisc.name,
        updatedDisc.type,
        updatedDisc.speed,
        updatedDisc.glide,
      ]
    );
    return new Disc(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM discs
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new Disc(rows[0]);
  }
}
module.exports = { Disc };
