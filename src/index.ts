import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import usersBase from './users.json' assert { type: 'json' };

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = []; //or you can type usersBase

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/api/users' && method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } else if (url !== undefined && url.startsWith('/api/users/') && method === 'GET') {
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
  } else if (url === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !hobbies) {
        res.statusCode = 400;
        res.end('Missing required fields');
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      users.push(newUser);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    });
  } else if (url !== undefined && url.startsWith('/api/users/') && method === 'PUT') {
    const userId = url.split('/')[3];
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body);

        if (!username || !age || !hobbies) {
          res.statusCode = 400;
          res.end('Missing required fields');
          return;
        }

        const updatedUser: User = {
          id: userId,
          username,
          age,
          hobbies,
        };

        users[userIndex] = updatedUser;

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(updatedUser));
      });
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  } else if (url !== undefined && url.startsWith('/api/users/') && method === 'DELETE') {
    const userId = url.split('/')[3];
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
