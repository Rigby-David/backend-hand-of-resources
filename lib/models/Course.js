const pool = require('../utils/pool');

class Course {
  id;
  name;
  location;
  rating;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.rating = row.rating;
  }
  
  static async getAllCourses() {
    const { rows } = await pool.query(
      'SELECT * FROM Courses'
    );
    return rows.map((row) => new Course(row));
  }

  static async getCourseById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM courses
      WHERE courses.id = $1
      GROUP BY courses.id`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Course(rows[0]);
  }
}

module.exports = { Course };
