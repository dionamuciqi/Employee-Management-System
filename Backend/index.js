// index.js
import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import sequelize from './utils/sequelize.js';
import Admin from './models/admin.js';
import Category from './models/category.js';
import Employee from './models/employee.js';
import Announcement from './models/announcement.js';
import Certification from './models/certifications.js';
import Department from './models/department.js';
import TrainingMode from './models/training_modes.js';
import Trainer from './models/trainers.js';
import Meet from './models/meets.js';
import EmployeeTrainer from './models/employee_trainers.js';
import EmployeeMeet from './models/employee_meets.js';
import Payroll from './models/payroll.js';
import HelpSupport from './models/help_support.js';
import Tasks from './models/tasks.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('Public'));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token, "BGYd4dq6HLUeOBhB0WR0lg3V2eeagnG0", (err, decoded) => {
            if(err) 
                return res.json({Status: false, Error: "Wrong Token"});
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({Status: false, Error: "Not authenticated"});
    }
};

app.get('/verify', verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id});
});

app.post('/auth/add_meets', async (req, res) => {
    const { topic, details, meeting_date, meeting_mode, employee_id } = req.body;

    try {
        const createdMeet = await Meet.create({
            topic,
            details,
            meeting_date,
            meeting_mode,
            employee_id
        });

        const createdEmployeeMeet = await EmployeeMeet.create({
            employee_id,
            meet_id: createdMeet.mid
        });

        return res.json({ Status: true });
    } catch (error) {
        return res.json({ Status: false, Error: error.message });
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running and DB synchronized");
        });
    })
    .catch(err => {
        console.error('Unable to synchronize the database:', err);
    });

export default app;
