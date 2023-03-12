import UserGroupDataAccess from '../dal/junction.dal.js';
import db from '../models/index.js';

const t = async () => {
  await db.sequelize.transaction();
};

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

export function addUsersToGroup(req, res) {
  if (req.query.groupId && req.query.userIds) {
    const junction = {
      groupId: req.query.groupId,
      userId: req.query.userIds,
    };
    UserGroupDataAccess.findUserGroup(junction)
      .then((data) => {
        if (data == null) {
          db.sequelize.transaction(() => {
            UserGroupDataAccess.createUserGroup(junction, { transaction: t })
              .then((userGroup) => {
                res.send(`Successfuly created junction: ${JSON.stringify(userGroup)}`);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
              err.message || 'Some error occurred while creating the junction.',
                });
              });
          });
        } else {
          res.send('UserGroup already exists');
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while finding UserGroup.',
        });
      });
  }
}
