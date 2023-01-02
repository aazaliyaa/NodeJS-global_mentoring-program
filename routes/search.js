import { Router } from 'express';
import { fileURLToPath } from 'url'
import path, { dirname } from 'path';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = [
  {
    id: 1,
    login: 'werful@mail.ru',
    password: 'dgghfg',
    age: 34,
    isDeleted: false,
  },
  {
    id: 2,
    login: 'aswerty@mail.ru',
    password: 'hyujki',
    age: 42,
    isDeleted: false,
  },
  {
    id: 3,
    login: 'qazdafju@inbox.ru',
    password: 'sdujvki',
    age: 16,
    isDeleted: false,
  },
  {
    id: 4,
    login: 'serjosa@mail.ru',
    password: 'xsdcfgh',
    age: 28,
    isDeleted: false,
  },
  {
    id: 5,
    login: 'jutyilo@inbox.ru',
    password: 'cdfvgrrsd',
    age: 31,
    isDeleted: false,
  },
];

// Browse users
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

export default router;
