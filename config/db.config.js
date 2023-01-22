export const HOST = 'localhost';
export const USER = 'postgres';
export const PASSWORD = 'Barbaris179$';
export const DB = 'postgres';
export const dialect = 'postgres';
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

export const predefinedUsers = [
  {
    login: 'qwyusud@ujk.com',
    password: 'asa566sd88',
    age: 25,
    isDeleted: false,
  },
  {
    login: 'sdsdd@ty.com',
    password: 'safaty5673h',
    age: 43,
    isDeleted: false,
  },
  {
    login: 'sdsdf@inbox.ru',
    password: 'asd567chdu9',
    age: 32,
    isDeleted: false,
  },
];

export const predefinedGroups = [
  {
    name: 'group_one',
    permissions: ['READ', 'WRITE', 'DELETE'],
  },
  {
    name: 'group_two',
    permissions: ['READ', 'WRITE', 'DELETE', 'UPLOAD_FILES'],
  },
  {
    name: 'group_three',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
];
