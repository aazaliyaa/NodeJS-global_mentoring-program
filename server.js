import { createServer } from 'http';
import express, { json } from 'express';
import usersRouter from './routes/users.js';
import groupsRouter from './routes/groups.js';
import db from './models/index.js';

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use('/', (req, res) => {
  res.send('Application works!');
});

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

const server = createServer(app);
const port = 3000;
server.listen(port);
console.debug(`Server listening on port ${port}`);
