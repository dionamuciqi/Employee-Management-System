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
import Meet from '../models/meets.js';
import Announcement from '../models/announcement.js';
import Certification from '../models/certifications.js';
import EmployeeTrainer from '../models/employee_trainers.js';
import EmployeeMeet from '../models/employee_meets.js';
import HelpSupport from '../models/help_support.js';
import Payroll from '../models/payroll.js';
import TrainingMode from '../models/training_modes.js';
import HealthService from '../models/healthservice.js';
import Leaves from '../models/leaves.js';

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
        if (employees.length === 0) {
            return res.json({ Status: false, Error: "No employees found" });
        }
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
            training: req.body.training_mode_id
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

router.post('/auth/add_meets', async (req, res) => {
    const { topic, details, meeting_date, meeting_mode, employee_id } = req.body;

    try {
        const createdMeet = await Meet.create({
            topic: req.body.topic,
            details: req.body.details,
            meeting_date: req.body.meeting_date,
            meeting_mode: req.body.meeting_mode,
            employee_id: req.body.employee_id
        });

        const createdEmployeeMeet = await EmployeeMeet.create({
            employee_id: req.body.employee_id,
            meet_id: createdMeet.id
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

router.get('/meets', async (req, res) => {
    try {
        const meets = await Meet.findAll();
        return res.json({ Status: true, Result: meets });
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

router.get('/meets/:mid', async (req, res) => {
    try {
        const mid = req.params.mid;
        const meet = await Meet.findByPk(mid);
        if (!meet) {
            return res.json({ Status: false, Error: "Meet not found" });
        }
        return res.json({ Status: true, Result: meet });
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
        console.log(req.params.id);
        const id = req.params.id;
        await EmployeeTrainer.destroy({ where:{ trainer_id: id}});
        const trainer = await Trainer.findByPk(id);
        //Duhet me u fshi se pari krejt rreshtat qe jane tek tabelat tjera qe e permbajne Id ekesaj tabele p.sh
        //Para se me fshi ne tabelen Trainers ju duheni me fshi ne tabelen Employee_Trainers
        if (!trainer) {
            return res.json({ Status: false, Error: "Trainer not found" });
        }
        await trainer.destroy();
        return res.json({ Status: true, Result: "Trainer deleted successfully" });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

router.delete('/delete_meets/:mid', async (req, res) => {
    try {
        console.log(req.params.mid);
        const mid = req.params.mid;
        await EmployeeMeet.destroy({ where:{ meet_id: mid}});
        const meet = await Meet.findByPk(mid);
 
        if (!meet) {
            return res.json({ Status: false, Error: "Meeting not found" });
        }
        await meet.destroy();
        return res.json({ Status: true, Result: "Meeting deleted successfully" });
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

router.get('/employee_meets/:employee_id', async (req, res) => {
    try {
        const employeeId = req.params.employee_id;
        const meets = await Meet.findAll({
            include: {
                model: Employee,
                where: { id: employeeId }
            }
        });

        return res.json({ Status: true, Result: meets });
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

//-------------Health Service-----------------
router.post('/healthservices', async (req, res) => {
    try {
        const { serviceName, serviceDate, description, employeeId } = req.body;

        if (!serviceName || !serviceDate || !employeeId) {
            return res.status(400).json({ success: false, error: 'Invalid request data' });
        }

        const healthService = await HealthService.create({ serviceName, serviceDate, description, employeeId });
        return res.json({ success: true, healthService });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error inserting health service' });
    }
});

router.get('/healthservices', async (req, res) => {
    try {
        const healthServices = await HealthService.findAll();
        return res.json({ success: true, healthServices });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error fetching health services' });
    }
});

//--------Leaves-------------
router.post('/leaves', async (req, res) => {
    const { leaveType, startDate, endDate, employeeId } = req.body;
    console.log('Received request data:', req.body);


    // Validate input data
    if (!leaveType || !startDate || !endDate || !employeeId) {
        console.error('Invalid request data:', req.body);
        return res.status(400).json({ success: false, error: 'Invalid request data' });
    }

    try {
        // Create a new leave record using Sequelize
        const newLeave = await Leaves.create({
            leaveType,
            startDate,
            endDate,
            employeeId
        });

        console.log('Leave inserted successfully with ID:', newLeave.id);
        return res.json({ success: true, leave: newLeave });
    } catch (error) {
        console.error('Error inserting leave:', error);
        return res.status(500).json({ success: false, error: 'Error inserting leave' });
    }
});

router.post('/payrolls', (req, res) => {
    const { employeeId, amount } = req.body;
    console.log('Received request data:', req.body);
  
    if (!employeeId || !amount) {
      console.error('Invalid request data:', req.body);
      return res.status(400).json({ success: false, error: 'Employee ID and Amount are required' });
    }
  
    const sql = 'INSERT INTO payroll (employeeId, amount) VALUES (?, ?)';
    con.query(sql, [employeeId, amount], (err, result) => {
      if (err) {
        console.error('Error inserting payroll:', err);
        return res.status(500).json({ success: false, error: 'Error inserting payroll' });
      }
      console.log('Payroll inserted successfully with ID:', result.insertId);
      return res.json({ success: true, payroll: { id: result.insertId, employeeId, amount } });
    });
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

router.post('/benefits', (req, res) => {
    const { employeeId, amount } = req.body;
    console.log('Received request data:', req.body);

    if (!employeeId || !amount) {
        console.error('Invalid request data:', req.body);
        return res.status(400).json({ success: false, error: 'Employee ID and Amount are required' });
    }

    const sql = 'INSERT INTO benefits (employeeId, amount) VALUES (?, ?)';
    con.query(sql, [employeeId, amount], (err, result) => {
        if (err) {
            console.error('Error inserting benefit:', err);
            return res.status(500).json({ success: false, error: 'Error inserting benefit' });
        }
        console.log('Benefit inserted successfully with ID:', result.insertId);
        return res.json({ success: true, benefit: { id: result.insertId, employeeId, amount } });
    });
});
  

router.post('/annualplans', (req, res) => {
    const { plan, end_date } = req.body;
    console.log('Received request data:', req.body);

    if (!plan || !end_date) {
        console.error('Invalid request data:', req.body);
        return res.status(400).json({ success: false, error: 'Plan and end date are required' });
    }

    const sql = 'INSERT INTO annual_plans (plan, end_date) VALUES (?, ?)';
    con.query(sql, [plan, end_date], (err, result) => {
        if (err) {
            console.error('Error inserting plan:', err);
            return res.status(500).json({ success: false, error: 'Error inserting plan' });
        }
        console.log('Plan inserted successfully with ID:', result.insertId);
        return res.json({ success: true, plan: { id: result.insertId, plan, end_date } });
    });
});

router.get('/annualplans', (req, res) => {
    const sql = 'SELECT id, plan, end_date, created_at FROM annual_plans';
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching plans:', err);
            return res.status(500).json({ success: false, error: 'Error fetching plans' });
        }
        console.log('Plans fetched successfully:', results);
        return res.json({ success: true, plans: results });
    });
});

router.delete('/clearplans', (req, res) => {
    const sql = 'DELETE FROM annual_plans';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error clearing plans:', err);
            return res.status(500).json({ success: false, error: 'Error clearing plans' });
        }
        console.log('Plans cleared successfully!');
        return res.json({ success: true });
    });
});
  
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:true})
})

export { router as adminRouter };