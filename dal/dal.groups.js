import db from '../models/index.js';

const Groups = db.groups;

const GroupsDataAccess = {
  createGroup: (value) => Groups.create(value),

  getAllGroups: () => Groups.findAll(),

  findGroupByPk: (pk) => Groups.findByPk(pk),

  updateGroup: (value, id) => Groups.update(value, { where: { id } }),

  deleteGroup: (id) => Groups.destroy({
    where: { id },
    truncate: false,
  }),
};

export default GroupsDataAccess;
