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
}

module.exports = { Pro };
