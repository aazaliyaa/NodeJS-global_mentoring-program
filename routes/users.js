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
    login: 'aswerty@mail.ru',
    password: 'hyujki',
    age: 42,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'qazdafju@inbox.ru',
    password: 'sdujvki',
    age: 16,
    isDeleted: false,
  },
  {
    id: '4',
    login: 'serjosa@mail.ru',
    password: 'xsdcfgh',
    age: 28,
    isDeleted: false,
  },
  {
    id: '5',
    login: 'jutyilo@inbox.ru',
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
router.get('/', (req, res) => {
  res.status(200).json(data);
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
