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

// Create and Save a new user
export function createUser(req, res) {
  // Create a User
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
    return res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  }
  // Save user in the database
  Users.create(newUser)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the user.',
      });
    });
  return res.send(`Successfuly created user: ${JSON.stringify(value)}`);
}

// Retrieve all Users from the database.
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

// Find a single User with an id
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
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}`,
      });
    });
}

// Update a User by the id in the request
export function updateUser(req, res) {
  const { id } = req.params;

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  }
  Users.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating user with id=${id}`,
      });
    });
  res.send(`Successfuly updated user: ${JSON.stringify(value)}`);
}

// Soft delete a User with the specified id in the request
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
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}`,
      });
    });

  Users.update(updated, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was soft deleted successfully.',
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting user with id=${id}`,
      });
    });
}
