// models/healthservice.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

const HealthService = sequelize.define('HealthService', {
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'healthservices',
    timestamps: false,
});

export default HealthService;
