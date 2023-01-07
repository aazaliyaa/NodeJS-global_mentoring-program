export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    login: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    age: { type: Sequelize.CHAR },
    isDeleted: { type: Sequelize.BOOLEAN },
  });

  return User;
};
