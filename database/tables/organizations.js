const client = require('../config.js');

const createOrganization = function (name) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO organizations (name)
                 VALUES ('${name}');`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Added new organization!')
        resolve(res);
      }
    }) 
  })
}

const selectAllOrganizations = function (organization) {
  return new Promise((resolve, reject) => {
    client.query('select * from organizations', (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Got all orgs!')
        resolve(res);
      }
    })
  });
}

module.exports = {
  selectAllOrganizations,
  createOrganization
}