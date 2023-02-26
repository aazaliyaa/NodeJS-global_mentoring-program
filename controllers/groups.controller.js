import GroupService from '../services/groups.service.js';
import GroupsDataAccess from '../dal/groups.dal.js';

export function createGroup(req, res) {
  const value = GroupService.createGroup(req.body);

  GroupsDataAccess.createGroup(value)
    .then((data) => {
      res.send(`Successfuly created group: ${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
      err.message || 'Some error occurred while creating the group.',
      });
    });
}

export function getAllGroups(req, res) {
  GroupsDataAccess.getAllGroups()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving groups.',
      });
    });
}

export function findGroupById(req, res) {
  const { id } = req.params;

  GroupsDataAccess.findGroupByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find group with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving group with id=${id}`,
      });
    });
}

export function updateGroup(req, res) {
  const { id } = req.params;
  const value = GroupService.createGroup(req.body);

  GroupsDataAccess.updateGroup(value, id)
    .then(() => {
      res.send(`Successfuly updated group: ${JSON.stringify(value)}`);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating group with id=${id}`,
      });
    });
}

export function deleteGroup(req, res) {
  const { id } = req.params;
  GroupsDataAccess.deleteGroup(id)
    .then(() => {
      res.send({ message: 'Group was deleted successfully!' });
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while removing group.',
      });
    });
}
