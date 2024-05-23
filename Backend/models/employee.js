import con from '../utils/db.js';

class employee {
  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employee WHERE email = ?";
      con.query(sql, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employee WHERE id = ?";
      con.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

export default employee;
