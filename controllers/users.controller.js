import UserService from '../services/users.service.js';
import UsersDataAccess from '../dal/dal.users.js';

export function createUser(req, res) {
  const { error, value } = UserService.createUser(req.body);

  if (error) {
    res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  } else {
    UsersDataAccess.createUser(value)
      .then((data) => {
        res.send(`Successfuly created user: ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        res.status(500).send({
          message:
      err.message || 'Some error occurred while creating the user.',
        });
      });
  }
}

export function getAllUsers(req, res) {
  UsersDataAccess.getAllUsers()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving users.',
      });
    });
}

export function findUserById(req, res) {
  const { id } = req.params;

  UsersDataAccess.findUserByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}`,
      });
    });
}

export function updateUser(req, res) {
  const { id } = req.params;
  const { error, value } = UserService.createUser(req.body);

  if (error) {
    res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  } else {
    UsersDataAccess.updateUser(value, id)
      .then(() => {
        res.send(`Successfuly updated user: ${JSON.stringify(value)}`);
      })
      .catch(() => {
        res.status(500).send({
          message: `Error updating user with id=${id}`,
        });
      });
  }
}

export function deleteUser(req, res) {
  const { id } = req.params;

  UsersDataAccess.findUserByPk(id)
    .then((user) => {
      if (user) {
        const deletedUser = UserService.deleteUser(user);

        UsersDataAccess.updateUser(deletedUser, id)
          .then(() => {
            res.send({
              message: 'User was soft deleted successfully.',
            });
          })
          .catch(() => {
            res.status(500).send({
              message: `Error deleting user with id=${id}`,
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}`,
      });
    });
}

export function deleteAll(req, res) {
  UsersDataAccess.deleteAllUsers()
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while removing all users.',
      });
    });
}
