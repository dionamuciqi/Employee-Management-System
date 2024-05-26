import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';
import Trainer from './trainers.js';

class EmployeeTrainer extends Model {}

EmployeeTrainer.init({
  id: {
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
  trainer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Trainer,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'EmployeeTrainer',
  tableName: 'employee_trainers',
  timestamps: false
});

EmployeeTrainer.belongsTo(Employee, { foreignKey: 'employee_id' });
EmployeeTrainer.belongsTo(Trainer, { foreignKey: 'trainer_id' });

export default EmployeeTrainer;
