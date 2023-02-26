import db from '../models/index.js';

const { userGroups } = db;

const UserGroupDataAccess = {
  createUserGroup: (value) => userGroups.create(value),
  findUserGroup: (value) => userGroups.findOne({
    where: { groupId: value.groupId, userId: value.userId },
  }),
};

export default UserGroupDataAccess;
