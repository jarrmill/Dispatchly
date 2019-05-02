const client = require('../config.js');

const createTask = function (title, division, task_status, assigned, organization ) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO tasks (title, division, task_status, assigned, organization)
                 VALUES ('${title}', '${division}', '${task_status}', '${assigned}', '${organization}');`;
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

const updateByTitle = function(title) {
  return new Promise((resolve, reject) => {
    client.query(`UPDATE tasks SET task_status = 'Complete' WHERE title='${title}'`, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

const getTasksByEmail = function(email) {
  return new Promise((resolve, reject) => {
    //the right join in this query is so it will return an organization in which the user may have not submitted any tasks yet
    const query = `select * from tasks
                   INNER JOIN organizations ON tasks.organization = organizations.name
                   RIGHT JOIN users_organizations ON organizations.name = users_organizations.organization
                   INNER JOIN users ON users_organizations.username = users.name
                   WHERE users.email='${email}';`
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Got user tasks!');
        resolve(res);
      }
    })
  });
}

module.exports = {
  getTasksByEmail,
  createTask,
  updateByTitle
}