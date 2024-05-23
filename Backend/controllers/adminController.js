import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

class adminController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.getByEmail(email);
      if (!admin) {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        return res.json({ loginStatus: false, Error: "Wrong password" });
      }
      const token = jwt.sign(
        { role: "admin", email: admin.email, id: admin.id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ loginStatus: false, Error: "Internal server error" });
    }
  }
}

export default adminController;
