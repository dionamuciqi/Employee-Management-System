import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';

class Announcement extends Model {}

Announcement.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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
  modelName: 'Announcement',
  tableName: 'announcements',
  timestamps: false
});

Announcement.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Announcement;
