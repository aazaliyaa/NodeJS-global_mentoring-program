import Joi from 'joi';
import db from '../models/index.js';

const Users = db.users;

const schema = Joi.object({
  login: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-zA-Z][0-9]|[0-9][a-zA-Z]/)
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
  isDeleted: Joi.boolean()
    .required(),
});

export function createUser(req, res) {
  const newUser = {
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };

  const { error, value } = schema.validate(newUser, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  } else {
    Users.create(value)
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
  Users.findAll()
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

  Users.findByPk(id)
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
  const updated = {
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };

  const { error, value } = schema.validate(updated, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  } else {
    Users.update(value, {
      where: { id },
    })
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
  let updated = {};

  Users.findByPk(id)
    .then((data) => {
      if (data) {
        updated = {
          login: data.login,
          password: data.password,
          age: data.age,
          isDeleted: true,
        };

        Users.update(updated, {
          where: { id },
        })
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
  Users.destroy({
    where: {},
    truncate: false,
  })
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
