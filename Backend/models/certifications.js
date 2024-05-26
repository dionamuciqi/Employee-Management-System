import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Employee from './employee.js';

class Certification extends Model {}

Certification.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  certificationName: {
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
  modelName: 'Certification',
  tableName: 'certifications',
  timestamps: false
});

Certification.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Certification;
