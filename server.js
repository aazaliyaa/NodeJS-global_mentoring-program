import { createServer } from 'http';
import express, { json } from 'express';
import usersRouter from './routes/users.route.js';
import groupsRouter from './routes/groups.route.js';
import junctionRouter from './routes/junction.route.js';
import db, { addPredefinedDatatoDB } from './models/index.js';
import { handleUncaughtException, handleUnhandledRejection, logServiceMethodAndArgs } from './controllers/logger.controller.js';

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));

const handleLogs = (req, res, next) => {
  logServiceMethodAndArgs(req, res);
  handleUncaughtException(res);
  handleUnhandledRejection(res);
  next();
};

app.use(handleLogs);

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/junction', junctionRouter);

app.use('/', (req, res) => {
  res.send('Application works!');
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
