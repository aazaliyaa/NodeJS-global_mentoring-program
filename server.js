import express, { json } from 'express';
import cors from 'cors';
import usersRouter from './routes/users.route.js';
import groupsRouter from './routes/groups.route.js';
import junctionRouter from './routes/junction.route.js';
import {
  handleUncaughtException, handleUnhandledRejection, logServiceMethodAndArgs, logControllerErrors,
} from './controllers/logger.controller.js';
import { login, checkAuthorization } from './controllers/authorization.controller.js';

function createServer() {
  const app = express();
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(
    //  checkAuthorization,
    // handleUncaughtException,
    // handleUnhandledRejection,
    logServiceMethodAndArgs,
    logControllerErrors,
  );

  app.use('/users', usersRouter);
  app.use('/groups', groupsRouter);
  app.use('/junction', junctionRouter);
  // LOGIN  http://localhost:3000/login?login=ghjytc@fggd.com&password=afsfs5677dfsj
  app.use('/login', login);

  app.use('/', (req, res) => {
    res.send('Application works!');
  });

  return app;
}

export default createServer;
