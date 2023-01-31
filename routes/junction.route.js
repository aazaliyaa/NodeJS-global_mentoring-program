import { Router } from 'express';
import db from '../models/index.js';
import createJunction from '../controllers/junction.controller.js';
import UserGroupDataAccess from '../dal/junction.dal.js';

const router = Router();
const t = await db.sequelize.transaction();

// CREATE
router.post('/', createJunction);

// http://localhost:3000/junction?groupId=1&userIds=3
router.get('/', (req, res) => {
  const addUsersToGroup = async (groupId, userId) => {
    const junction = {
      groupId,
      userId,
    };
    const ifUserGroupExists = await UserGroupDataAccess.findUserGroup(junction);
    if (ifUserGroupExists == null) {
      await db.sequelize.transaction(async () => {
        await UserGroupDataAccess.createUserGroup(junction, { transaction: t });
      });
      res.send('junction was created');
    } else {
      res.send('UserGroup already exists');
    }
  };

  if (req.query.groupId && req.query.userIds) {
    addUsersToGroup(req.query.groupId, req.query.userIds);
  }
});

export default router;
