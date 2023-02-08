import { createServer } from 'http';
import express, { json } from 'express';
import usersRouter from './routes/users.route.js';
import groupsRouter from './routes/groups.route.js';
import junctionRouter from './routes/junction.route.js';
import db, { addPredefinedDatatoDB } from './models/index.js';
import logger from './logger.js';

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/junction', junctionRouter);

app.use('/', (req, res) => {
  res.send('Application works!');
  logger.debug(`req.method ${req.method}`);
});

db.sequelize.sync()
  .then(() => {
    addPredefinedDatatoDB();
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

const server = createServer(app);
const port = 3000;
server.listen(port);
console.debug(`Server listening on port ${port}`);
