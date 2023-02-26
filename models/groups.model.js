import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Group = sequelize.define('group', {
    name: { type: DataTypes.STRING },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });

  return Group;
};
