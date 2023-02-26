import { DataTypes } from 'sequelize';

export default (sequelize, User, Group) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: 'id',
      },
    },
  });

  User.belongsToMany(Group, { through: 'UserGroup' });
  Group.belongsToMany(User, { through: 'UserGroup' });

  return UserGroup;
};
