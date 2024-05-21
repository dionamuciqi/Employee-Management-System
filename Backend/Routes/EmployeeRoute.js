import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error: "wrong email or password" });
      }
    });
  });

router.get('/detail/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ? "
    con.query(sql, [id] , (err, result) => {
        if(err) return res.json({Status:false});
        return res.json(result)
    })
})
router.post('/helpsupport', (req, res) => {
    const { question } = req.body;
    const sql = 'INSERT INTO help_support (question) VALUES (?)';
    con.query(sql, [question], (err, result) => {
      if (err) {
        console.error('Error saving question:', err);
        return res.status(500).json({ success: false, error: 'Error saving question' });
      }
      console.log('Question saved successfully');
      return res.json({ success: true, message: 'Question saved successfully' });
    });
  });
  router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if(response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "employee", email: email, id: result[0].id },
                        "jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});

// Endpoint to get employee details
router.get('/detail/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ? ";
    con.query(sql, [id] , (err, result) => {
        if(err) return res.json({Status:false});
        return res.json(result);
    });
});
// Get trainers for a specific employee
router.get('/employee_trainers/:employee_id', (req, res) => {
  const { employee_id } = req.params;
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

// Endpoint për të marrë trajnerët e specifikuar për një punëtor
router.get('/employee_trainers/:employee_id', (req, res) => {
  const { employee_id } = req.params;
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

// Endpoint to get trainers assigned to an employee
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

// Help and Support Endpoint
router.post('/helpsupport', (req, res) => {
    const { question } = req.body;
    const sql = 'INSERT INTO help_support (question) VALUES (?)';
    con.query(sql, [question], (err, result) => {
        if (err) {
            console.error('Error saving question:', err);
            return res.status(500).json({ success: false, error: 'Error saving question' });
        }
        console.log('Question saved successfully');
        return res.json({ success: true, message: 'Question saved successfully' });
    });
});

// Logout Endpoint
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: true});
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as EmployeeRouter}