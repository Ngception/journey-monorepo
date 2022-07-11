import { readFileSync } from 'fs';

export const httpsOptions = {
  key: readFileSync('ssl/ssl.key'),
  cert: readFileSync('ssl/ssl.crt'),
};
