const client = require('../config.js');

const createUser = function (email, name) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users (email, name)
                 VALUES ('${email}', '${name}')
                 ON CONFLICT DO NOTHING;`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Created user: ', name);
        resolve(res);
      }
    }) 
  })
}

const selectAllUsers = function () {
  return new Promise((resolve, reject) => {
    client.query('select * from users', (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Got all users!')
        resolve(res);
      }
    })
  });
}

module.exports = {
  selectAllUsers,
  createUser
}