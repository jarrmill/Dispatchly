const client = require('../config.js');

const createEntry = function (email, organization) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users_organizations (username, organization)
                 VALUES ('${email}', '${organization}')
                 ON CONFLICT DO NOTHING;`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Added new user/organization link. ${email} - ${organization}`);
        resolve(res);
      }
    }) 
  })
}

const deleteEntry = function (email, organization) {
  return new Promise((resolve, reject) => {
    let query = `DELETE from users_organizations WHERE username='${email}' AND organization='${organization}'`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Deleted user link. ${email} - ${organization}`);
        resolve(res);
      }
    }) 
  }) 
}
const selectOrganizationByName = function(orgName) {
  return new Promise((resolve, reject) => {
    client.query(`select * from users_organizations WHERE organization='${orgName}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Got all users for ${orgName}!`)
        resolve(res.rows);
      }
    })
  });
}

const selectOrganizationsByEmail = function (email) {
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
  createEntry,
  deleteEntry,
  selectOrganizationByName,
  selectOrganizationsByEmail
}