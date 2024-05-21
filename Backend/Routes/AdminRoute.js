import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin WHERE email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id }, 
                "jwt_secret_key", 
                { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_department', (req, res) => {
    const sql = "INSERT INTO department (name) VALUES (?)"
    con.query(sql, [req.body.department], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 


router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name , email , password , address , salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
})
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "SELECT count(id) as admin FROM admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "SELECT count(id) as employee FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "SELECT sum(salary) as salary FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})


router.post('/add_trainers', (req, res) => {
    const sql = `INSERT INTO trainers 
    (name , qualification , email , address , department_id) 
    VALUES (?)`;

        const values = [
            req.body.name,
            req.body.qualification,
            req.body.email,
            req.body.address,
            req.body.department_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })

router.get('/trainers', (req, res) => {
    const sql = "SELECT * FROM trainers";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.get('/trainers/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM trainers WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
})
})

router.put('/edit_trainers/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE trainers 
        set name = ?, qualification = ?, email = ?, address = ?, department_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.qualification,
        req.body.email,
        req.body.address,
        req.body.department_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_trainers/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from trainers where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

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

router.get('/employee/trainings', (req, res) => {
    const employeeId = req.user.id; // Assuming you have user info in the request object
    const sql = "SELECT * FROM trainings WHERE employee_id = ?";
    con.query(sql, [employeeId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/employee_trainers/:employee_id', (req, res) => {
    const { employee_id } = req.params;
    const sql = `
        SELECT trainers.* FROM trainers
        JOIN employees ON trainers.employee_id = employees.id
        WHERE employees.id = ?
    `;
    con.query(sql, [employee_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});
router.get('/employee/trainings', (req, res) => {
    const employeeId = req.user.id; // Assuming req.user.id is the employee ID from the token
    const sql = `
        SELECT trainings.* FROM trainings
        JOIN employee_trainings ON trainings.id = employee_trainings.training_id
        WHERE employee_trainings.employee_id = ?
    `;
    con.query(sql, [employeeId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
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


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})

export { router as adminRouter };