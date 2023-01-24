import UserGroupDataAccess from '../dal/junction.dal.js';

export default function createJunction(req, res) {
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
