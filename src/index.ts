import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import usersBase from './users.json' assert { type: 'json' };

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = usersBase; //or you can type anything else

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/api/users' && method === 'GET') {
    // Получение всех пользователей
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } else if (url !== undefined && url.startsWith('/api/users/') && method === 'GET') {
    // Получение пользователя по ID
    const userId = url.split('/')[3];
    const user = users.find((u) => u.id === userId);

    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  } 
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
