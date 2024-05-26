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

const router = express.Router();

// Helper function to extract and verify JWT token from cookies
const extractUserIdFromToken = (cookies) => {
    if (!cookies) throw new Error('Authentication token is missing');
    const token = cookies.split('; ').find(cookie => cookie.startsWith('token='));
    if (!token) throw new Error('Authentication token is missing');
    const decodedToken = jwt.verify(token.split('=')[1], "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0");
    return decodedToken.id;
};

router.post("/employee_login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
        bcrypt.compare(password, employee.password, (err, response) => {
            if (err || !response) {
                return res.json({ loginStatus: false, Error: "Wrong email or password" });
            }
            const token = jwt.sign({ role: "employee", email, id: employee.id }, "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0", { expiresIn: "1d" });
            res.cookie('token', token);
            return res.json({ loginStatus: true, id: employee.id });
        });
    } catch (error) {
        return res.json({ loginStatus: false, Error: "Query error" });
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
    const decodedToken = jwt.verify(cookies.replace("token=", ""), "jwt_secret_key");
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
// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

export { router as EmployeeRouter };
