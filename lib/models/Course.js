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
}

module.exports = { Course };
