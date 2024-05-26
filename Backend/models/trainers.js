import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import Department from './department.js';
import Employee from './employee.js';
import TrainingMode from './training_modes.js';

class Trainer extends Model {}

Trainer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING(45)
  },
  email: {
    type: DataTypes.STRING(130),
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING(70)
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  training_mode_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TrainingMode,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Trainer',
  tableName: 'trainers',
  timestamps: false
});

Trainer.belongsTo(Department, { foreignKey: 'department_id' });
Trainer.belongsTo(Employee, { foreignKey: 'employee_id' });
Trainer.belongsTo(TrainingMode, { foreignKey: 'training_mode_id' });

export default Trainer;
