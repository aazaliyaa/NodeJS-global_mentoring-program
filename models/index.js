import Sequelize from 'sequelize';
import {
  DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool, predefinedUsers,
} from '../config/db.config.js';
import usersModel from './users.model.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: 0,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = usersModel(sequelize, Sequelize);

predefinedUsers.forEach(async (user) => {
  await db.users.findOrCreate({
    where: { login: user.login },
    defaults: user,
  });
  console.log('predefined user was added to the database');
});

export default db;
