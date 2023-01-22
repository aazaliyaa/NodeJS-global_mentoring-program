import Sequelize from 'sequelize';
import {
  DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool, predefinedUsers, predefinedGroups,
} from '../config/db.config.js';
import usersModel from './users.model.js';
import groupsModel from './groups.model.js';

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

db.groups = groupsModel(sequelize, Sequelize);

db.users = usersModel(sequelize, Sequelize);

await sequelize.sync({ force: true });

predefinedUsers.forEach(async (user) => {
  await db.users.findOrCreate({
    where: { login: user.login },
    defaults: user,
  });
  console.log('predefined user was added to the database');
});

predefinedGroups.forEach(async (group) => {
  await db.groups.findOrCreate({
    where: { name: group.name },
    defaults: group,
  });
  console.log('predefined group was added to the database');
});

export default db;
