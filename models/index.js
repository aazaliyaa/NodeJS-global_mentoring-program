import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
import { POOL, predefinedUsers, predefinedGroups } from '../config/db.config.js';
import usersModel from './users.model.js';
import groupsModel from './groups.model.js';
import userGroupModel from './junction.model.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: 0,

  pool: {
    max: POOL.max,
    min: POOL.min,
    acquire: POOL.acquire,
    idle: POOL.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groups = groupsModel(sequelize);
db.users = usersModel(sequelize);
db.userGroups = userGroupModel(sequelize, db.users, db.groups);

export const addPredefinedDatatoDB = () => {
  predefinedUsers.forEach(async (user) => {
    await db.users.findOrCreate({
      where: { login: user.login },
      defaults: user,
    });
  });

  predefinedGroups.forEach(async (group) => {
    await db.groups.findOrCreate({
      where: { name: group.name },
      defaults: group,
    });
  });
};

export default db;
