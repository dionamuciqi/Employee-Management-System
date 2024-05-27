import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class AnnualPlans extends Model {}

AnnualPlans.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  plan: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'AnnualPlans',
  tableName: 'annual_plans',
  timestamps: false
});

export default AnnualPlans;
