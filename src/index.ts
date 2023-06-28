import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const server = http.createServer((req, res) => {});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
