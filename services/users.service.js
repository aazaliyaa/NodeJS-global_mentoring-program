import Joi from 'joi';
import jwt from 'jsonwebtoken';

const schema = Joi.object({
  login: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-zA-Z][0-9]|[0-9][a-zA-Z]/)
    .required(),
  age: Joi.number().integer().min(4).max(130)
    .required(),
  isDeleted: Joi.boolean().required(),
});

const loginSchema = Joi.object({
  login: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-zA-Z][0-9]|[0-9][a-zA-Z]/)
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

  createJWTToken: (req) => {
    const { username, password } = req.body;

    const { error } = loginSchema.validate({ username, password }, {
      abortEarly: false,
    });

    const token = jwt.sign(username, 'secret_key', { expiresIn: '1h' });

    if (error) return error;
    return token;
  },
};

export default UserService;
