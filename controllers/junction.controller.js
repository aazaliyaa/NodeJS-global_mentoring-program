import UserGroupDataAccess from '../dal/junction.dal.js';
import db from '../models/index.js';

const t = await db.sequelize.transaction();

export function createJunction(req, res) {
  UserGroupDataAccess.createUserGroup(req.body)
    .then((data) => {
      res.send(`Successfuly created junction: ${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || 'Some error occurred while creating the junction.',
      });
    });
}

export async function addUsersToGroup(req, res) {
  if (req.query.groupId && req.query.userIds) {
    const junction = {
      groupId: req.query.groupId,
      userId: req.query.userIds,
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
  }
}
