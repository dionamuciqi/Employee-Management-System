import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class Payroll extends Model {}

Payroll.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  salaryAmount: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Payroll',
  tableName: 'payroll',
  timestamps: false
});

export default Payroll;
