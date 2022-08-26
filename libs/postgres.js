const { Client } = require('pg');

async function GetConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'jesus',
    password: 'root1001',
    database: 'my_store',
  });

  await client.connect();
  return client;
}

module.exports = GetConnection;
