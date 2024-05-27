import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';
import Meet from './meets.js';

class EmployeeMeet extends Model {}

EmployeeMeet.init({
  emid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  meet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Meet,
      key: 'mid'
    }
  }
}, {
  sequelize,
  modelName: 'EmployeeMeet',
  tableName: 'employee_meets',
  timestamps: false
});

EmployeeMeet.belongsTo(Employee, { foreignKey: 'employee_id' });
EmployeeMeet.belongsTo(Meet, { foreignKey: 'meet_id' });

export default EmployeeMeet;