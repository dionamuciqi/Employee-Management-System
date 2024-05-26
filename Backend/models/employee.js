import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Category from './category.js';

class Employee extends Model {}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  salary: {
    type: DataTypes.INTEGER
  },
  address: {
    type: DataTypes.STRING(30)
  },
  image: {
    type: DataTypes.STRING(60)
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employee',
  timestamps: false
});

Employee.belongsTo(Category, { foreignKey: 'category_id' });

export default Employee;
