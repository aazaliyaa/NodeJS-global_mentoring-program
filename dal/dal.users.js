import db from '../models/index.js';

const Users = db.users;

const UsersDataAccess = {
  createUser: (value) => Users.create(value),

  getAllUsers: () => Users.findAll(),

  findUserByPk: (pk) => Users.findByPk(pk),

  updateUser: (value, id) => Users.update(value, { where: { id } }),

  deleteAllUsers: () => Users.destroy({
    where: {},
    truncate: false,
  }),
};

export default UsersDataAccess;
