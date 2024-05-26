import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

class TrainingMode extends Model {}

TrainingMode.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mode: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TrainingMode',
  tableName: 'training_modes',
  timestamps: false
});

export default TrainingMode;
