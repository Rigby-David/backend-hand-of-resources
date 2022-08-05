const pool = require('../utils/pool');

class Artist {
  id;
  band;
  guitar;
  drums;
  bass;

  constructor(row) {
    this.id = row.id;
    this.band = row.band;
    this.guitar = row.guitar;
    this.drums = row.drums;
    this.bass = row.bass;
  }

  static async getAllArtists() {
    const { rows } = await pool.query(
      'SELECT * FROM artists'
    );
    return rows.map((row) => new Artist(row));
  }
}
module.exports = { Artist };
