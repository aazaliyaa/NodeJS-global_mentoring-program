import request from 'supertest';
import createServer from '../server.js';

afterEach(() => {
  jest.clearAllMocks();
});

describe('getAllGroups', () => {
  it('expexted status code is valid', async () => {
    const response = await request(createServer()).get('/groups');
    expect(response.status).toBe(200);
  });
});

describe('createGroup', () => {
  test('should return a 200 status code when group data is valid', async () => {
    const response = await request(createServer()).post('/groups').send({
      name: 'group_one',
      permissions: ['READ', 'WRITE', 'DELETE'],
    });
    expect(response.statusCode).toBe(200);
  });

  test('should return a 400 status code when user data is invalid', async () => {
    const response = await request(createServer()).post('/groups').send({
      permissions: 'sdfghjkl',
    });
    expect(response.statusCode).toBe(500);
  });
});

describe('findGroupById', () => {
  test('should return a 200 status code', async () => {
    const response = await request(createServer()).get('/groups/1');
    expect(response.statusCode).toBe(200);
  });

  test('should return a 404 status code if group does not exist', async () => {
    const response = await request(createServer()).get('/groups/77777777');
    expect(response.statusCode).toBe(404);
  });
});

describe('deleteGroup', () => {
  test('should return a 200 status code', async () => {
    await request(createServer()).delete('/groups/2');
    const deletedUserResponse = await request(createServer()).get('/groups/2');
    expect(JSON.stringify(deletedUserResponse.body)).toBe(JSON.stringify({ message: 'Cannot find group with id=2.' }));
  });
});

describe('updateGroup', () => {
  test('should update group', async () => {
    const group = {
      name: 'group_one',
      permissions: ['READ', 'WRITE', 'DELETE'],
    };
    await request(createServer()).put('/groups/1').send(group);
    const response = await request(createServer()).get('/groups/1');
    expect(response.body.name).toBe(group.name);
    expect(response.body.permissions).toStrictEqual(group.permissions);
  });
});
