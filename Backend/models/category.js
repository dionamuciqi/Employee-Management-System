import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class Category extends Model {}

Category.init({
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
  modelName: 'Category',
  tableName: 'category',
  timestamps: false
});

export default Category;
