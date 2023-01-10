import { createServer } from 'http';
import express, { json } from 'express';
import usersRouter from './routes/users.js';

const app = express();
app.use(json());

app.use('/users', usersRouter);

app.use('/', (req, res) => {
  res.send('Application works!');
});

const server = createServer(app);
const port = 3000;
server.listen(port);
console.debug(`Server listening on port ${port}`);
