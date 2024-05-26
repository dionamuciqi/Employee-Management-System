import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
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

const router = express.Router()

router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email, password } });
        if (admin) {
            const token = jwt.sign(
                { role: "admin", email: admin.email, id: admin.id }, 
                "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0", 
                { expiresIn: "1d" }
            );
            res.cookie('token', token);
            res.cookie('email', email); 
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ loginStatus: false, Error: "Internal Server Error" });
    }
});

router.get('/category', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.json({ Status: true, Result: categories });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});

router.post('/add_category', async (req, res) => {
    try {
        const newCategory = await Category.create({ name: req.body.category });
        return res.json({ Status: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});

router.get('/department', async (req, res) => {
    try {
        const departments = await Department.findAll();
        return res.json({ Status: true, Result: departments });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});


router.post('/add_department', async (req, res) => {
    try {
        const newDepartment = await Department.create({ name: req.body.department });
        return res.json({ Status: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Status: false, Error: "Internal Server Error" });
    }
});

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


router.post('/add_employee', upload.single('image'), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newEmployee = await Employee.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            salary: req.body.salary,
            image: req.file.filename,
            category_id: req.body.category_id
        });

        return res.json({Status: true});
    } catch (error) {
        return res.json({Status: false, Error: error.message});
    }
});

router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        return res.json({Status: true, Result: employees});
    } catch (error) {
        return res.json({Status: false, Error: error.message});
    }
});

router.get('/employee/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.json({ Status: false, Error: "Employee not found" });
        }

        return res.json({ Status: true, Result: employee });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.put('/edit_employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        
        if (!employee) {
            return res.json({ Status: false, Error: "Employee not found" });
        }

        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.salary = req.body.salary;
        employee.address = req.body.address;
        employee.categoryId = req.body.category_id;

        await employee.save();
        return res.json({ Status: true, Result: "Employee updated successfully" });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});



router.delete('/delete_employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        
        if (!employee) {
            return res.json({ Status: false, Error: "Employee not found" });
        }
        await employee.destroy();
        return res.json({ Status: true, Result: "Employee deleted successfully" });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});


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


router.get('/admin_records', async (req, res) => {
    try {
        const admins = await Admin.findAll();
        return res.json({Status: true, Result: admins});
    } catch (error) {
        return res.json({Status: false, Error: "Query Error" + error.message});
    }
});


router.post('/add_trainers', async (req, res) => {
    try {
        const createdTrainer = await Trainer.create({
            name: req.body.name,
            qualification: req.body.qualification,
            email: req.body.email,
            address: req.body.address,
            department_id: req.body.department_id,
            training_mode_id: req.body.training_mode_id
        });

        const createdEmployeeTrainer = await EmployeeTrainer.create({
            employee_id: req.body.employee_id,
            trainer_id: createdTrainer.id
        });

        return res.json({ Status: true });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});


router.get('/trainers', async (req, res) => {
    try {
        const trainers = await Trainer.findAll();
        return res.json({ Status: true, Result: trainers });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.get('/trainers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const trainer = await Trainer.findByPk(id);
        if (!trainer) {
            return res.json({ Status: false, Error: "Trainer not found" });
        }
        return res.json({ Status: true, Result: trainer });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.put('/edit_trainers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const trainer = await Trainer.findByPk(id);
        if (!trainer) {
            return res.json({ Status: false, Error: "Trainer not found" });
        }
        await trainer.update({
            name: req.body.name,
            qualification: req.body.qualification,
            email: req.body.email,
            address: req.body.address,
            department_id: req.body.department_id
        });
        return res.json({ Status: true, Result: "Trainer updated successfully" });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.delete('/delete_trainers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const trainer = await Trainer.findByPk(id);
        
        if (!trainer) {
            return res.json({ Status: false, Error: "Trainer not found" });
        }
        await trainer.destroy();
        return res.json({ Status: true, Result: "Trainer deleted successfully" });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});


router.get('/department', async (req, res) => {
    try {
        const departments = await Department.findAll();
        return res.json({ Status: true, Result: departments });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

// router.get('/employee/trainings', (req, res) => {
//     const cookies = req.headers.cookie;
//     console.log(cookies)
//     const decodedToken = jwt.verify(cookies.replace("token=",""),"BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0" )
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

router.get('/employee_trainers/:employee_id', async (req, res) => {
    try {
        const employeeId = req.params.employee_id;
        const trainers = await Trainer.findAll({
            include: {
                model: Employee,
                where: { id: employeeId }
            }
        });

        return res.json({ Status: true, Result: trainers });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.get('/employee/trainings', async (req, res) => {
    try {
        const cookies = req.headers.cookie;
        const decodedToken = jwt.verify(cookies.replace("token=",""),"BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0" )
        const userId = decodedToken.id
        
        const trainings = await EmployeeTraining.findAll({
            where: { employeeId: userId },
            include: [Training] 
        });

        return res.json({ Status: true, Result: trainings });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});


router.post('/announcements', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            console.error('Invalid request data:', req.body);
            return res.status(400).json({ success: false, error: 'Message is required' });
        }
        const announcement = await Announcement.create({ message });

        console.log('Announcement inserted successfully with ID:', announcement.id);
        return res.json({ success: true, notification: { id: announcement.id, message } });
    } catch (error) {
        console.error('Error inserting announcement:', error);
        return res.status(500).json({ success: false, error: 'Error inserting announcement' });
    }
});

router.get('/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            attributes: ['id', 'message', 'created_at', 'employee_id'] 
        });

        console.log('Announcements fetched successfully:', announcements);
        return res.json({ success: true, notifications: announcements });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return res.status(500).json({ success: false, error: 'Error fetching announcements' });
    }
});


router.delete('/clearnotifications', async (req, res) => {
    try {
      await Announcement.destroy({ truncate: true });
  
      console.log('Notifications cleared successfully!');
      return res.json({ success: true, message: 'Notifications cleared successfully' });
    } catch (error) {
      console.error('Error clearing notifications:', error);
      return res.status(500).json({ success: false, error: 'Error clearing notifications' });
    }
  });
  

 //-------------------
 router.post('/certifications', async (req, res) => {
    try {
        const { certificationName, employeeId } = req.body;
        console.log('Received request data:', req.body);

        if (!certificationName || !employeeId) {
            console.error('Invalid request data:', req.body);
            return res.status(400).json({ success: false, error: 'Invalid request data' });
        }

        const certification = await Certification.create({ certificationName, employeeId });

        console.log('Certification inserted successfully with ID:', certification.id);
        return res.json({ success: true, certification });
    } catch (error) {
        console.error('Error inserting certification:', error);
        return res.status(500).json({ success: false, error: 'Error inserting certification' });
    }
});


router.post('/payroll', async (req, res) => {
    try {
        const { employeeId, salaryAmount, paymentDate } = req.body;
        console.log('Received payroll data:', req.body);

        if (!employeeId || !salaryAmount || !paymentDate) {
            console.error('Invalid payroll data:', req.body);
            return res.status(400).json({ success: false, error: 'Invalid payroll data' });
        }

        const payroll = await Payroll.create({ employeeId, salaryAmount, paymentDate });

        console.log('Payroll submitted successfully with ID:', payroll.id);
        return res.json({ success: true, payroll });
    } catch (error) {
        console.error('Error inserting payroll:', error);
        return res.status(500).json({ success: false, error: 'Error inserting payroll' });
    }
});


router.get('/support-requests', async (req, res) => {
    try {
        const helpRequests = await HelpSupport.findAll();
        console.log('Help requests fetched successfully:', helpRequests);
        return res.json({ success: true, help_requests: helpRequests });
    } catch (error) {
        console.error('Error fetching help requests:', error);
        return res.status(500).json({ success: false, error: 'Error fetching help requests' });
    }
});

router.delete('/clearall', async (req, res) => {
    try {
        await HelpSupport.destroy({ truncate: true });
        console.log('Help requests cleared successfully!');
        return res.json({ success: true, message: 'Help requests cleared successfully' });
    } catch (error) {
        console.error('Error clearing help requests:', error);
        return res.status(500).json({ success: false, error: 'Error clearing help requests' });
    }
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
