const pool = require('../utils/pool');

class Pro {
  id;
  name;
  pob;
  dob;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.pob = row.pob;
    this.dob = row.dob;
  }

  static async getAllPros() {
    const { rows } = await pool.query(
      'SELECT * FROM Pros'
    );
    return rows.map((row) => new Pro(row));
  }

  static async getProById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM pros
        WHERE pros.id = $1
        GROUP BY pros.id`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Pro(rows[0]);
  }

  static async insert({ name, pob, dob }) {
    const { rows } = await pool.query(
      `INSERT INTO pros (name, pob, dob)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, pob, dob]
    );
    return new Pro(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const pro = await Pro.getProById(id);
    if (!pro) return null;
    const updatedPro = { ...pro, ...newAttrs};
    const { rows } = await pool.query(
      `
        UPDATE pros
        SET name = $2, pob = $3, dob = $4
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedPro.name,
        updatedPro.pob,
        updatedPro.dob,
      ]
    );
    return new Pro(rows[0]);
  }
}

module.exports = { Pro };
