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
            res.cookie('token', token);
            res.cookie('email', email); 
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
    (name , qualification , email , address , department_id, training_mode_id) 
    VALUES (?)`;
    console.log(req.body)
        const values = [
            req.body.name,
            req.body.qualification,
            req.body.email,
            req.body.address,
            req.body.department_id,
            req.body.training_mode
        ]
        con.query(sql, [values], (err, result) => {
            console.log('Result,', result);

            
            //TODO: Me insert ne emplee_trainers
         const sql = `INSERT INTO employee_trainers 
         (employee_id, trainer_id) 
         VALUES (?)`;
    
            const values = [
             req.body.employee_id,
             result.insertId
            ]
            console.log('Valuies',values);
             con.query(sql, [values], (err, result) => {
                // if(err) return res.json({Status: false, Error: err})
                //  return res.json({Status: true})
             })
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

// router.get('/employee/trainings', (req, res) => {
//     const cookies = req.headers.cookie;
//     console.log(cookies)
//     const decodedToken = jwt.verify(cookies.replace("token=",""),"jwt_secret_key" )
//     const userId = decodedToken.id
//     console.log('userId',userId)
//     // Nuk vjen kjo info ne front eshte ne jwt te userit qe eshte i kyqur const employeeId = req.user.id; // Assuming you have user info in the request object
//     const sql = `SELECT t.* FROM trainers t
// 	                inner join employee_trainers et on et.trainer_id = t.id
//                  where et.employee_id = ?`;
//     con.query(sql, [userId], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true, Result: result });
//     });
// }); 

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
    const cookies = req.headers.cookie;
    console.log(cookies)
    const decodedToken = jwt.verify(cookies.replace("token=",""),"jwt_secret_key" )
    const userId = decodedToken.id
    console.log('userId',userId)
    const sql = `
        SELECT trainings.* FROM trainings
        JOIN employee_trainings ON trainings.id = employee_trainings.training_id
        WHERE employee_trainings.employee_id = ?
    `;
    con.query(sql, [userId], (err, result) => {
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



router.post('/announcements', (req, res) => {
    const { message } = req.body;
    console.log('Received request data:', req.body);

    if (!message) {
        console.error('Invalid request data:', req.body);
        return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const sql = 'INSERT INTO announcements (message) VALUES (?)';
    con.query(sql, [message], (err, result) => {
        if (err) {
            console.error('Error inserting announcement:', err);
            return res.status(500).json({ success: false, error: 'Error inserting announcement' });
        }
        console.log('Announcement inserted successfully with ID:', result.insertId);
        return res.json({ success: true, notification: { id: result.insertId, message } });
    });
});

router.get('/announcements', (req, res) => {
    const sql = 'SELECT id, message, created_at FROM announcements'; // Include creation time in the query
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            return res.status(500).json({ success: false, error: 'Error fetching announcements' });
        }
        console.log('Announcements fetched successfully:', results);
        return res.json({ success: true, notifications: results });
    });
});


router.delete('/clearnotifications', (req, res) => {
    const sql = 'DELETE FROM announcements';
    con.query(sql, (err, result) => {
      if (err) {
        console.error('Error clearing notifications:', err);
        return res.status(500).json({ success: false, error: 'Error clearing notifications' });
      }
      console.log('Notifications cleared successfully!');
      return res.json({ success: true, message: 'Notifications cleared successfully' });
    });
  });

 //-------------------
 router.post('/certifications', (req, res) => {
    const { certificationName, employeeId } = req.body;
    console.log('Received request data:', req.body);

    // Validate input data
    if (!certificationName || !employeeId) {
        console.error('Invalid request data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid request data' });
    }

    // Insert certification into the database
    const sql = 'INSERT INTO certifications (certificationName, employeeId) VALUES (?, ?)';
    con.query(sql, [certificationName, employeeId], (err, result) => {
        if (err) {
            console.error('Error inserting certification:', err);
            return res.status(500).json({ success: false, error: 'Error inserting certification' });
        }
        console.log('Certification inserted successfully with ID:', result.insertId);
        return res.json({ success: true, certification: { id: result.insertId, certificationName, employeeId } });
    });
});

// Route to clear all certifications
router.delete('/clearcertifications', (req, res) => {
    const sql = 'DELETE FROM certifications';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error clearing certifications:', err);
            return res.status(500).json({ success: false, error: 'Error clearing certifications' });
        }
        console.log('Certifications cleared successfully!');
        return res.json({ success: true, message: 'Certifications cleared successfully' });
    });
});


// Endpoint to submit payroll
router.post('/payroll', (req, res) => {
    const { employeeId, salaryAmount, paymentDate } = req.body;
    console.log('Received payroll data:', req.body);

    // Validate input data
    if (!employeeId || !salaryAmount || !paymentDate) {
        console.error('Invalid payroll data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid payroll data' });
    }

    // Insert payroll information into the database
    const sql = 'INSERT INTO payroll (employeeId, salaryAmount, paymentDate) VALUES (?, ?, ?)';
    con.query(sql, [employeeId, salaryAmount, paymentDate], (err, result) => {
        if (err) {
            console.error('Error inserting payroll:', err);
            return res.status(500).json({ success: false, error: 'Error inserting payroll' });
        }
        console.log('Payroll submitted successfully with ID:', result.insertId);
        return res.json({ success: true, payroll: { id: result.insertId, employeeId, salaryAmount, paymentDate } });
    });
});

// Route to update salary
router.patch('/payroll/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const { salaryAmount } = req.body;
    console.log('Received salary update data:', req.body);

    // Validate input data
    if (!salaryAmount) {
        console.error('Invalid salary update data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid salary update data' });
    }

    // Update salary in the database
    const sql = 'UPDATE payroll SET salaryAmount = ? WHERE employeeId = ?';
    con.query(sql, [salaryAmount, employeeId], (err, result) => {
        if (err) {
            console.error('Error updating salary:', err);
            return res.status(500).json({ success: false, error: 'Error updating salary' });
        }
        console.log('Salary updated successfully for employee:', employeeId);
        return res.json({ success: true, message: 'Salary updated successfully' });
    });
});

router.get('/support-requests', (req, res) => {
    const sql = 'SELECT * FROM help_support';
    
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching help requests:', err);
            return res.status(500).json({ success: false, error: 'Error fetching help requests' });
        }
        console.log('Help requests fetched successfully:', results); 
        return res.json({ success: true, help_requests: results });
    });
});

// Route to clear all certifications
router.delete('/clearall', (req, res) => {
    const sql = 'DELETE FROM help_support';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error clearing:', err);
            return res.status(500).json({ success: false, error: 'Error clearing' });
        }
        console.log('Notifications cleared successfully!');
        return res.json({ success: true, message: 'Notifications cleared successfully' });
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})


// Endpoint to submit payroll
router.post('/payroll', (req, res) => {
    const { employeeId, salaryAmount, paymentDate } = req.body;
    console.log('Received payroll data:', req.body);

    // Validate input data
    if (!employeeId || !salaryAmount || !paymentDate) {
        console.error('Invalid payroll data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid payroll data' });
    }

    // Insert payroll information into the database
    const sql = 'INSERT INTO payroll (employeeId, salaryAmount, paymentDate) VALUES (?, ?, ?)';
    con.query(sql, [employeeId, salaryAmount, paymentDate], (err, result) => {
        if (err) {
            console.error('Error inserting payroll:', err);
            return res.status(500).json({ success: false, error: 'Error inserting payroll' });
        }
        console.log('Payroll submitted successfully with ID:', result.insertId);
        return res.json({ success: true, payroll: { id: result.insertId, employeeId, salaryAmount, paymentDate } });
    });
});

// Route to update salary
router.patch('/payroll/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const { salaryAmount } = req.body;
    console.log('Received salary update data:', req.body);

    // Validate input data
    if (!salaryAmount) {
        console.error('Invalid salary update data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid salary update data' });
    }

    // Update salary in the database
    const sql = 'UPDATE payroll SET salaryAmount = ? WHERE employeeId = ?';
    con.query(sql, [salaryAmount, employeeId], (err, result) => {
        if (err) {
            console.error('Error updating salary:', err);
            return res.status(500).json({ success: false, error: 'Error updating salary' });
        }
        console.log('Salary updated successfully for employee:', employeeId);
        return res.json({ success: true, message: 'Salary updated successfully' });
    });
});


export { router as adminRouter };
