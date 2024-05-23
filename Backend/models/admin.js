import con from '../utils/db.js';

class admin {
  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM admin WHERE email = ?";
      con.query(sql, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

export default admin;
