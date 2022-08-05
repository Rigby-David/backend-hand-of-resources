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
  
  static async insert({ title,
    director,
    released,
    genre }) {
    const { rows } = await pool.query(
      `
        INSERT INTO movies (title,
            director,
            released,
            genre)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [title,
        director,
        released,
        genre]
        
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const movie = await Movie.getMovieById(id);
    if (!movie) return null;
    const updatedMovie = { ...movie, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE movies
        SET title = $2, director = $3, released = $4, genre = $5
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedMovie.title,
        updatedMovie.director,
        updatedMovie.released,
        updatedMovie.genre,
      ]
    );
    return new Movie(rows[0]);
  }
}
module.exports = { Movie };
