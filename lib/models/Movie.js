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
}
module.exports = { Movie };
