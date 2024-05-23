import Sequelize from 'sequelize';

const sequelize = new Sequelize('employeems', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Attendance = sequelize.define('Attendance', {
  roomNo: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    defaultValue: new Date().toString().substring(0, 15),
  },
  data: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: {},
  },
  details: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: {},
  }
}, {
  timestamps: true,
});

export default Attendance;
