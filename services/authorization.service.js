import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { privateKey } from '../config/config.js';

const schema = Joi.object({
  login: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-zA-Z][0-9]|[0-9][a-zA-Z]/)
    .required(),
});

const AuthorizationService = {
  createJWTToken: (req) => {
    const { login, password } = req.query;

    const { error } = schema.validate({ login, password }, {
      abortEarly: false,
    });

    const payload = { login };

    const token = jwt.sign(payload, privateKey, { expiresIn: '1h' });

    if (error) return error;
    return token;
  },
};

export default AuthorizationService;
