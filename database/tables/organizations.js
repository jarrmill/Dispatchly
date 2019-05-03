const client = require('../config.js');

const createOrganization = function (name, adminEmail) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO organizations (name, admin)
                 VALUES ('${name}', '${adminEmail}');`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Added new organization - ', name);
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

const selectOrganizationByName = function (name) {
  return new Promise((resolve, reject) => {
    client.query(`select * from organizations WHERE name='${name}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    })
  }); 
}

module.exports = {
  selectAllOrganizations,
  createOrganization,
  selectOrganizationByName
}