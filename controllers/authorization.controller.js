import jwt from 'jsonwebtoken';
import AuthorizationService from '../services/authorization.service.js';
import { privateKey } from '../config/config.js';

// eslint-disable-next-line consistent-return
export function checkAuthorization(req, res, next) {
  if (req.path === '/login') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.send(401, 'Unauthorized request');
  }

  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, privateKey);
    next();
  } catch (error) {
    return res.status(403).send('Invalid JWT token');
  }
}

export function login(req, res) {
  if (req.query.login && req.query.password) {
    const token = AuthorizationService.createJWTToken(req);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
