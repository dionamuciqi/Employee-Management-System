import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Helper function to extract and verify JWT token from cookies
const extractUserIdFromToken = (cookies) => {
    if (!cookies) throw new Error('Authentication token is missing');
    const token = cookies.split('; ').find(cookie => cookie.startsWith('token='));
    if (!token) throw new Error('Authentication token is missing');
    const decodedToken = jwt.verify(token.split('=')[1], "jwt_secret_key");
    return decodedToken.id;
};

// Employee login
router.post("/employee_login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * from employee WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err || !response) return res.json({ loginStatus: false, Error: "Wrong email or password" });
                const token = jwt.sign({ role: "employee", email, id: result[0].id }, "jwt_secret_key", { expiresIn: "1d" });
                res.cookie('token', token);
                return res.json({ loginStatus: true, id: result[0].id });
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

// Get employee details
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result);
    });
});

// Get trainers for a specific employee
router.get('/employee_trainers', (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const sql = `
            SELECT trainers.* FROM trainers
            JOIN employee_trainers ON trainers.id = employee_trainers.trainer_id
            WHERE employee_trainers.employee_id = ?
        `;
        con.query(sql, [userId], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" });
            return res.json({ Status: true, Result: result });
        });
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
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const sql = `
            SELECT id, message, created_at 
            FROM announcements 
            WHERE employee_id = ? 
            ORDER BY created_at DESC
        `;
        con.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).json({ success: false, error: 'Error fetching notifications' });
            return res.json({ success: true, notifications: results });
        });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});

// Get certifications
router.get('/certifications', (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const sql = `
            SELECT id, certificationName, employeeId 
            FROM certifications 
            WHERE employeeId = ? 
            ORDER BY id DESC
        `;
        con.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).json({ success: false, error: 'Error fetching certifications' });
            return res.json({ success: true, certifications: results });
        });
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

// Get payroll information
router.get('/payroll', (req, res) => {
    try {
        const userId = extractUserIdFromToken(req.headers.cookie);
        const paymentDate = req.query.paymentDate;
        const sql = `
            SELECT id, employeeId, salaryAmount, paymentDate 
            FROM payroll 
            WHERE employeeId = ? AND paymentDate = ? 
            ORDER BY id DESC
        `;
        con.query(sql, [userId, paymentDate], (err, results) => {
            if (err) return res.status(500).json({ success: false, error: 'Error fetching payroll information' });
            return res.json({ success: true, payroll: results });
        });
    } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
    }
});

// Submit help and support request
router.post('/help-support', (req, res) => {
    const { email, name, phoneNumber, description, priority, startDate } = req.body;
    if (!email || !name || !phoneNumber || !description || !priority || !startDate) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    const sql = `INSERT INTO help_support (email, name, phoneNumber, description, priority, startDate) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [email, name, phoneNumber, description, priority, startDate];
    con.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ success: false, error: 'Database error' });
        return res.json({ success: true, message: 'Help request submitted successfully' });
    });
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

export { router as EmployeeRouter };
