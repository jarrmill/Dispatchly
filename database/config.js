const { Client } = require('pg');
const client = new Client({
  user: 'jarrodmiller',
  database: 'jarrodmiller',
  password: ''
});

client.connect()
  .then((success) => {
    console.log('Successfully connected to database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err);
  });

module.exports = client;