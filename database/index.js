const Users = require('./tables/users');
const Tasks = require('./tables/tasks');
const Organizations = require('./tables/organizations');

module.exports = {
  Users,
  Tasks,
  Organizations
}


const createOrg = function (name) {
  return new Promise((resolve, reject) => {
    client.query('select * from users', (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Got all users!')
        resolve(res);
      }
    }) 
  })
}


const createDivision = function (name, organization) {
  return new Promise((resolve, reject) => {
    client.query('select * from users', (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Got all users!')
        resolve(res);
      }
    }) 
  })
}