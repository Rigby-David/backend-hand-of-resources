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

  static async insert({ name, location, rating }) {
    const { rows } = await pool.query(
      `
        INSERT INTO courses (name, location, rating)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, location, rating]
        
    );
    return new Course(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const courses = await Course.getCourseById(id);
    if (!courses) return null;
    const updatedCourse = { ...courses, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE courses
        SET name = $2, location = $3, rating = $4
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedCourse.name,
        updatedCourse.location,
        updatedCourse.rating,
      ]
    );
    return new Course(rows[0]);
  }
}

module.exports = { Course };
