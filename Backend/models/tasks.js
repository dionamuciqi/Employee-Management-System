import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  taskName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: false
});

Task.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Task;
