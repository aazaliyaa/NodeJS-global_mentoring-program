import db from '../models/index.js';

const { userGroups } = db;

const UserGroupDataAccess = {
  createUserGroup: (value) => userGroups.create(value),
};

export default UserGroupDataAccess;
