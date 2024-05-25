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
router.get('/employee_trainers', (req, res) => {
  const test = req.headers.cookie;
    const decodedToken = jwt.verify(test.replace("token=",""),"jwt_secret_key" )
    const userId = decodedToken.id
  const sql = `
      SELECT trainers.* FROM trainers
      JOIN employee_trainers ON trainers.id = employee_trainers.trainer_id
      WHERE employee_trainers.employee_id = ?
  `;
  con.query(sql, [userId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

router.get('/trainings', (req, res) => {
    const cookies = req.headers.cookie;
    const decodedToken = jwt.verify(cookies.replace("token=",""),"jwt_secret_key" )
    const userId = decodedToken.id
    const sql = `
    SELECT 
	t.id,
	t.name,
    t.qualification,
    t.email,
    d.name as department,
    tm.mode as training
    FROM trainers t
	inner join employee_trainers et on et.trainer_id = t.id
    inner join department d on d.id = t.department_id
    left join training_modes tm on tm.id = t.training_mode_id
    where et.employee_id = ?
    `;
    con.query(sql, [userId], (err, result) => {
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

//----------------------------------------------------------------------------------------------

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
//----------------------------
router.get('/certifications', (req, res) => {
    const cookies = req.headers.cookie;
    const decodedToken = jwt.verify(cookies.replace("token=", ""), "jwt_secret_key");
    const userId = decodedToken.id;
    console.log('Decoded User ID:', userId);

    const sql = `
    SELECT 
    id, 
    certificationName, 
    employeeId 
    FROM certifications 
    WHERE employeeId = ? 
    ORDER BY id DESC`;

    con.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching certifications:', err);
            return res.status(500).json({ success: false, error: 'Error fetching certifications' });
        }

        console.log('Fetched Certifications:', results);
        return res.json({ success: true, certifications: results });
    });
});
//---------------------

// Logout Endpoint
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: true});
});

export { router as EmployeeRouter}