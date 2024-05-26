import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class Leaves extends Model {}

Leaves.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  leaveType: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Leaves',
  tableName: 'leaves',
  timestamps: false
});

export default Leaves;