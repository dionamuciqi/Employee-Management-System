import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/employee.js';

class employeeController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const employee = await Employee.getByEmail(email);
      if (!employee) {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
      const match = await bcrypt.compare(password, employee.password);
      if (!match) {
        return res.json({ loginStatus: false, Error: "Wrong password" });
      }
      const token = jwt.sign(
        { role: "employee", email: employee.email, id: employee.id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true, id: employee.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ loginStatus: false, Error: "Internal server error" });
    }
  }

  static async detail(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.getById(id);
      if (!employee) {
        return res.json({ Status: false });
      }
      return res.json(employee);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Status: false, Error: "Internal server error" });
    }
  }
}

export default employeeController;
