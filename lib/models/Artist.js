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

  static async getArtistById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM artists
      WHERE artists.id = $1
      GROUP BY artists.id`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Artist(rows[0]);
  }

  static async insert({ band,
    guitar,
    drums,
    bass }) {
    const { rows } = await pool.query(
      `
        INSERT INTO artists (band,
            guitar,
            drums,
            bass)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [band,
        guitar,
        drums,
        bass]
        
    );
    return new Artist(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const artist = await Artist.getArtistById(id);
    if (!artist) return null;
    const updatedArtist = { ...artist, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE artists
        SET band = $2, guitar = $3, drums = $4, bass = $5
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedArtist.band,
        updatedArtist.guitar,
        updatedArtist.drums,
        updatedArtist.bass,
      ]
    );
    return new Artist(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM artists
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new Artist(rows[0]);
  }
}
module.exports = { Artist };
