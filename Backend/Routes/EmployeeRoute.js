import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/admin.js'
import Category from '../models/category.js';
import Department from '../models/department.js';
import Employee from '../models/employee.js';
import Trainer from '../models/trainers.js';
import Announcement from '../models/announcement.js';
import Certification from '../models/certifications.js';
import EmployeeTrainer from '../models/employee_trainers.js';
import HelpSupport from '../models/help_support.js';
import Payroll from '../models/payroll.js';
import TrainingMode from '../models/training_modes.js';
import HealthService from '../models/healthservice.js';


const router = express.Router();

// Helper function to extract and verify JWT token from cookies
const extractUserIdFromToken = (cookies) => {
    if (!cookies) throw new Error('Authentication token is missing');
    const token = cookies.split('; ').find(cookie => cookie.startsWith('token='));
    if (!token) throw new Error('Authentication token is missing');
    const decodedToken = jwt.verify(token.split('=')[1], "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0");
    return decodedToken.id;
};

router.post('/employee_login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }

        const isValidPassword = bcrypt.compareSync(password, employee.password);
        if (!isValidPassword) {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }

        const token = jwt.sign(
            { role: "employee", email: employee.email, id: employee.id }, 
            "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0", 
            { expiresIn: "1d" }
        );
        res.cookie('token', token);
        res.cookie('email', email); 
        return res.json({ loginStatus: true, id: employee.id });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ loginStatus: false, Error: "Internal Server Error" });
    }
});

router.get('/detail/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.json({ Status: false });
        }
        return res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        return res.json({ Status: false });
    }
});

router.get('/employee_trainers', async (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const trainers = await EmployeeTrainer.findAll({
            where: { employee_id: userId },
            include: [Trainer] 
        });
        if (!trainers || trainers.length === 0) {
            return res.json({ Status: false, Error: "No trainers found for the employee" });
        }
        return res.json({ Status: true, Result: trainers });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});

// Get trainings
router.get('/trainings', (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const sql = `
            SELECT 
            t.id, t.name, t.qualification, t.email, 
            d.name as department, tm.mode as training
            FROM trainers t
            INNER JOIN employee_trainers et ON et.trainer_id = t.id
            INNER JOIN department d ON d.id = t.department_id
            LEFT JOIN training_modes tm ON tm.id = t.training_mode_id
            WHERE et.employee_id = ?
        `;
        con.query(sql, [userId], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" });
            return res.json({ Status: true, Result: result });
        });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});

// Get employee trainers by employee ID
router.get('/employee_trainers/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id;
    const sql = `
        SELECT trainers.* FROM trainers
        JOIN employee_trainers ON trainers.id = employee_trainers.trainer_id
        WHERE employee_trainers.employee_id = ?
    `;
    con.query(sql, [employee_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

// Get notifications
router.get('/notifications', (req, res) => {
    const cookies = req.headers.cookie;
    const decodedToken = jwt.verify(cookies.replace("token=", ""), "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0");
    const userId = decodedToken.id;
    console.log('Decoded User ID:', userId);

    const sql = `
    SELECT 
    id, 
    message, 
    created_at 
    FROM announcements 
    WHERE employee_id = ? 
    ORDER BY created_at DESC`;

    con.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            return res.status(500).json({ success: false, error: 'Error fetching notifications' });
        }

        console.log('Fetched Notifications:', results);
        return res.json({ success: true, notifications: results });
    });
});

// Get certifications
router.get('/certifications', async (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const certifications = await Certification.findAll({
            attributes: ['id', 'certificationName', 'employeeId'],
            where: { employeeId: userId },
            order: [['id', 'DESC']]
        });
        return res.json({ success: true, certifications });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});
//------------------Health Service----------------------
router.get('/healthservices', async (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const healthServices = await HealthService.findAll({
            where: { employeeId: userId },
            order: [['id', 'DESC']]
        });
        return res.json({ success: true, healthServices });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});
//-------------Leavess--------------------
// Get leaves for the authenticated employee
router.get('/leaves', (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const sql = `
            SELECT id, leaveType, startDate, endDate, employeeId 
            FROM leaves 
            WHERE employeeId = ? 
            ORDER BY id DESC
        `;
        con.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).json({ success: false, error: 'Error fetching leaves' });
            return res.json({ success: true, leaves: results });
        });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});

router.get('/payrolls', (req, res) => {
    const sql = 'SELECT id, employeeId, amount FROM payroll';
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching payrolls:', err);
        return res.status(500).json({ success: false, error: 'Error fetching payrolls' });
      }
      console.log('Payrolls fetched successfully:', results);
      return res.json({ success: true, payrolls: results });
    });
  });

router.post('/help-support', async (req, res) => {
    try {
        const { email, name, phoneNumber, description, priority, startDate } = req.body;

        if (!email || !name || !phoneNumber || !description || !priority || !startDate) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }
        const helpSupportRequest = await HelpSupport.create({
            email,
            name,
            phoneNumber,
            description,
            priority,
            startDate
        });
        return res.json({ success: true, message: 'Help request submitted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error' });
    }
});
router.get('/benefits', (req, res) => {
    const sql = 'SELECT id, employeeId, amount FROM benefits';
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching benefits:', err);
            return res.status(500).json({ success: false, error: 'Error fetching benefits' });
        }
        console.log('Benefits fetched successfully:', results);
        return res.json({ success: true, benefits: results });
    });
});
// Employee Forgot Password Route
router.post('/employee_forgot_password', (req, res) => {
    const { email } = req.body;
    const sql = "SELECT id FROM employee WHERE email = ?"; // Use the correct table name

    con.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Database query error" });
        }
        if (result.length === 0) {
            console.log("Email not found:", email);
            return res.status(400).json({ success: false, message: "Email not found" });
        }

        const resetToken = jwt.sign({ id: result[0].id }, "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0", { expiresIn: "1h" });
        const resetLink = `http://localhost:5173/employee_reset_password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ilirjasharajj@gmail.com',
                pass: 'wipx nspz ashn vtwy'
            }
        });

        const mailOptions = {
            from: 'ilirjasharajj@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ success: false, message: "Error sending email" });
            }
            return res.json({ success: true, message: "Password reset link sent to your email" });
        });
    });
});

// Employee Reset Password Route
router.post('/employee_reset_password', (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0");
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const sql = "UPDATE employee SET password = ? WHERE id = ?";
        con.query(sql, [hashedPassword, decoded.id], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error resetting password" });
            }
            return res.json({ success: true, message: "Password reset successfully" });
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

export { router as EmployeeRouter };
