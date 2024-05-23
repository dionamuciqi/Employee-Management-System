import Sequelize from 'sequelize';

const sequelize = new Sequelize('employeems', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Employee = sequelize.define('Employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fatherContact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roomNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  blockNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

export default Employee;
