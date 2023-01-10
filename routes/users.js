import { Router } from 'express';
import Joi from 'joi';

const router = Router();

const data = [
  {
    id: '1',
    login: 'werful@mail.ru',
    password: 'dgghfg',
    age: 34,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'sdfdfty@mail.ru',
    password: 'hyujki',
    age: 42,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'werydafju@inbox.ru',
    password: 'sdujvki',
    age: 16,
    isDeleted: false,
  },
  {
    id: '4',
    login: 'wrutrjosa@mail.ru',
    password: 'xsdcfgh',
    age: 28,
    isDeleted: false,
  },
  {
    id: '5',
    login: 'weryilo@inbox.ru',
    password: 'cdfvgrrsd',
    age: 31,
    isDeleted: false,
  },
];

const schema = Joi.object({
  id: Joi.string()
    .required(),
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

// READ
// http://localhost:3000/users?loginSubstring=wer&limit=2  for getAutoSuggestUsers
router.get('/', (req, res) => {
  const getAutoSuggestUsers = (loginSubstring, limit) => {
    const arr = data.reduce((accumulator, user) => {
      const loginSub = user.login.split('').slice(0, loginSubstring.length).join('');

      if (loginSubstring === loginSub) {
        accumulator.push(user);
      }

      return accumulator;
    }, []);

    return arr.slice(0, limit - 1);
  };

  if (req.query.loginSubstring && req.query.limit) {
    const matchedUsers = getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);

    res.status(200).json(matchedUsers);
  } else {
    res.status(200).json(data);
  }
});

// READ
router.get('/:id', (req, res) => {
  const foundUser = data.find((item) => item.id === req.params.id);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.sendStatus(404);
  }
});

// CREATE
router.post('/', (req, res) => {
  const newId = data.length + 1;

  const newItem = {
    id: newId.toString(),
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };

  const { error, value } = schema.validate(newItem, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
  }
  data.push(newItem);
  return res.send(`Successfuly created user: ${JSON.stringify(value)}`);
});

// UPDATE
router.put('/:id', (req, res) => {
  const foundUser = data.find((item) => item.id === req.params.id);

  if (foundUser) {
    const updated = {
      id: foundUser.id.toString(),
      login: req.body.login,
      password: req.body.password,
      age: req.body.age,
      isDeleted: false,
    };

    const targetIndex = data.indexOf(foundUser);

    const { error, value } = schema.validate(updated, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).send(`Invalid Request: ${JSON.stringify(error)}`);
    }
    data.splice(targetIndex, 1, updated);
    res.send(`Successfuly updated user: ${JSON.stringify(value)}`);
  }
  res.sendStatus(404);
});

// DELETE
router.delete('/:id', (req, res) => {
  const foundUser = data.find((item) => item.id === req.params.id);

  if (foundUser) {
    const updated = {
      id: foundUser.id,
      login: foundUser.login,
      password: foundUser.password,
      age: foundUser.age,
      isDeleted: true,
    };

    const targetIndex = data.indexOf(foundUser);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default router;
