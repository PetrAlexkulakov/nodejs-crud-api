import axios from 'axios';
import assert from 'assert';

describe('API тесты', function() {
  let createdUserId;

  it('Получить все записи', async function() {
    const response = await axios.get('http://localhost:4000/api/users');
    assert.deepStrictEqual(response.data, []);
  });
});
