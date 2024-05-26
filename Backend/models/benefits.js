import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';

class Benefit extends Model {}

Benefit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    onUpdate: DataTypes.literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize,
  modelName: 'Benefit',
  tableName: 'benefits',
  timestamps: true
});

Benefit.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Benefit;