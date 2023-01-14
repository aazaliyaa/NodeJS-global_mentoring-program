import Joi from 'joi';

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

const UserService = {
  createUser: (reqBody) => {
    const newUser = {
      login: reqBody.login,
      password: reqBody.password,
      age: reqBody.age,
      isDeleted: false,
    };

    const { error, value } = schema.validate(newUser, {
      abortEarly: false,
    });

    return { error, value };
  },

  deleteUser: (user) => ({
    login: user.login,
    password: user.password,
    age: user.age,
    isDeleted: true,
  }),

};

export default UserService;
