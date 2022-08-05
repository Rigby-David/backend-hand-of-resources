const pool = require('../utils/pool');

class Movie {
  id;
  title;
  director;
  released;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.released = row.released;
    this.genre = row.genre;
  }

  static async getAllMovies() {
    const { rows } = await pool.query(
      'SELECT * FROM movies'
    );
    return rows.map((row) => new Movie(row));
  }

  static async getMovieById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM movies
      WHERE movies.id = $1
      GROUP BY movies.id`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Movie(rows[0]);
  }
}
module.exports = { Movie };
