import { Router } from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const router = Router();

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// Browse users
router.get('/', (req, res) => {
  res.sendFile(path.join(`${dirName}/../index.html`));
});

export default router;
