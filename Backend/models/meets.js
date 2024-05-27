import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';

class Meet extends Model {}

Meet.init({
  mid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topic: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  details: {
    type: DataTypes.TEXT
  },
  meeting_date: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: false
  },
  meeting_mode: {
    type: DataTypes.ENUM('Physical', 'Online')
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Meet',
  tableName: 'meets',
  timestamps: false
});

Meet.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Meet;
