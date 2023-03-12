import request from 'supertest';
import createServer from '../server.js';
import UsersDataAccess from '../dal/users.dal.js';
import {
  getAllUsers,
} from '../controllers/users.controller.js';

afterEach(() => {
  jest.clearAllMocks();
});

describe('getAllUsers', () => {
  const expectedUsers = [
    {
      id: 1,
      login: 'qwyusud@ujk.com',
      password: 'asa566sd88',
      age: 25,
      isDeleted: false,
    },
    {
      id: 2,
      login: 'sdsdd@ty.com',
      password: 'safaty5673h',
      age: 43,
      isDeleted: false,
    },
    {
      id: 3,
      login: 'sdsdf@inbox.ru',
      password: 'asd567chdu9',
      age: 32,
      isDeleted: false,
    },
  ];
  jest.spyOn(UsersDataAccess, 'getAllUsers').mockResolvedValueOnce(expectedUsers);

  it('get expexted users from database', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();
    await getAllUsers(req, res, next);

    expect(UsersDataAccess.getAllUsers).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(expectedUsers);
  });

  it('expexted status code is valid', async () => {
    const response = await request(createServer()).get('/users');
    expect(response.status).toBe(200);
  });
});

describe('createUser', () => {
  test('should return a 200 status code when user data is valid', async () => {
    const response = await request(createServer()).post('/users').send({
      login: 'safgdhfdf@inbox.ru',
      password: 'asd567erfdu9',
      age: 35,
      isDeleted: false,
    });
    expect(response.statusCode).toBe(200);
  });

  test('should return a 400 status code when user data is invalid', async () => {
    const response = await request(createServer()).post('/users').send({
      login: 'safgdhfdf@inbox.ru',
      age: 35,
      isDeleted: false,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('updateUser', () => {
  test('should update user', async () => {
    const user = {
      login: 'safgdhfdf@inbox.ru',
      password: 'asd567erfdu9',
      age: 35,
      isDeleted: false,
    };
    await request(createServer()).put('/users/1').send(user);
    const response = await request(createServer()).get('/users/1');
    expect(response.body.login).toBe(user.login);
    expect(response.body.password).toBe(user.password);
    expect(Number(response.body.age)).toBe(user.age);
  });

  test('should return a 200 status code when user data is valid', async () => {
    const response = await request(createServer()).put('/users/2').send({
      login: 'safgdhfdf@inbox.ru',
      password: 'asd567erfdu9',
      age: 35,
      isDeleted: false,
    });
    expect(response.statusCode).toBe(200);
  });

  test('should return a 400 status code when user data is invalid', async () => {
    const response = await request(createServer()).put('/users/2').send({
      login: 'safgdhfdfinbox.ru',
      password: '1234567',
      age: 35,
    });
    expect(response.statusCode).toBe(400);
  });

  test('should return a 400 status code if user does not exist', async () => {
    const response = await request(createServer()).put('/users/66666666').send({
      login: 'safgdhfdfinbox.ru',
      password: '1234567',
      age: 35,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('findUserById', () => {
  test('should return a 200 status code', async () => {
    const response = await request(createServer()).get('/users/1');
    expect(response.statusCode).toBe(200);
  });

  test('should return a 404 status code if user does not exist', async () => {
    const response = await request(createServer()).get('/users/77777777');
    expect(response.statusCode).toBe(404);
  });
});

describe('deleteUser', () => {
  test('should return a 200 status code', async () => {
    await request(createServer()).delete('/users/2');
    const deletedUserResponse = await request(createServer()).get('/users/2');
    expect(deletedUserResponse.body.isDeleted).toBeTruthy();
  });

  test('should return a 404 status code if user does not exist', async () => {
    const response = await request(createServer()).delete('/users/77777777');
    expect(response.statusCode).toBe(404);
  });
});
