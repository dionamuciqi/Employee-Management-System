import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class Department extends Model {}

Department.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Department',
  tableName: 'department',
  timestamps: false
});

export default Department;
