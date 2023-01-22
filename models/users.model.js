import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('user', {
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    age: { type: DataTypes.CHAR },
    isDeleted: { type: DataTypes.BOOLEAN },
  });

  return User;
};
