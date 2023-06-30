import axios from 'axios';
import assert from 'assert';

describe('API тесты', function() {
  let createdUserId;

  it('Получить все записи', async function() {
    const response = await axios.get('http://localhost:4000/api/users');
    assert.deepStrictEqual(response.data, []);
  });

  it('Создать новую запись', async function() {
    const newUser = { 
    username: "user2",
    age: 30,
    hobbies: ["gaming", "cooking"] 
  };
    const response = await axios.post('http://localhost:4000/api/users', newUser);
    assert.strictEqual(response.status, 201);
    assert.deepStrictEqual(response.data.username, newUser.username);
    createdUserId = response.data.id;
  });

  it('Получить созданную запись', async function() {
    const response = await axios.get(`http://localhost:4000/api/users/${createdUserId}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.id, createdUserId);
  });

  it('Обновить созданную запись', async function() {
    const updatedUser = { 
      id: createdUserId, 
      username: "user5",
      age: 33,
      hobbies: ["music", "dancing"] };
    const response = await axios.put(`http://localhost:4000/api/users/${createdUserId}`, updatedUser);
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.data, updatedUser);
  });

  it('Удалить созданную запись', async function() {
    const response = await axios.delete(`http://localhost:4000/api/users/${createdUserId}`);
    assert.strictEqual(response.status, 204);
  });

  it('Получить удаленную запись', async function() {
    try {
      await axios.get(`http://localhost:4000/api/users/${createdUserId}`);
    } catch (error) {
      assert.strictEqual(error.response.status, 404);
    }
  });
});
