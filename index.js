import createServer from './server.js';
import db, { addPredefinedDatatoDB } from './models/index.js';

db.sequelize.sync()
  .then(() => {
    addPredefinedDatatoDB();
    console.log('Synced db.');
    const server = createServer();
    const port = 3000;
    server.listen(port);
    console.debug(`Server listening on port ${port}`);
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });
