import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js'; 

class Payroll extends Model {}

Payroll.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee, 
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Payroll',
  tableName: 'payroll',
  timestamps: false
});


Payroll.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Payroll;