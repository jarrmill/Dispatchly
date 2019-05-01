const client = require('../config.js');

const createTask = function (title, division, organization, assigned) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO tasks (title, division, organization, assigned)
                 VALUES ('${title}', '${division}', '${organization}', '${assigned}');`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Added new task!')
        resolve(res);
      }
    }) 
  })
}

const selectAllTasks = function (organization) {
  return new Promise((resolve, reject) => {
    client.query('select * from tasks', (err, res) => {
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
  selectAllTasks,
  createTask
}