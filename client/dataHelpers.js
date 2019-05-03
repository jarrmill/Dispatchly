import axios from 'axios';

const login = function(name, email) {
  console.log('Posting user to DB');
  axios.post('http://localhost:3000/api/users', {name, email})
    .then((success) => {
      console.log('Success!');
    })
    .catch((err) => {
      console.log('Error posting user to DB');
    })
}
const getTasksByEmail = function(email) {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/api/tasks', {headers: { email}})
    .then((success) => {
      resolve(success);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

const deleteUserOrgLink = function(email, organization) {
  return new Promise((resolve, reject) => {
    axios.delete('http://localhost:3000/api/organizations', { headers: {email, organization }})
      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
const createTask = function(title, division, organization, assigned) {
  axios.post('http://localhost:3000/api/tasks', { title, division, organization, task_status: 'New', assigned })
    .then((success) => {
      console.log('Success!')
    })
    .catch((err) => {
      console.log('Error posting task to DB');
    })
}

const adminAddUser = function(name, email, newUser) {
  axios.post('http://localhost:3000/api/organizations/adduser', { name, email, newUser})
    .then((success) => {
      console.log('Successfully added user', success);
    })
    .catch((error) => {
      console.error('Error in admin adding user: ', error);
    });
}

const completeTask = function(title) {
  axios.put('http://localhost:3000/api/tasks', { title })
    .then((success) => {
      console.log('Task set to complete')
    })
    .catch((err) => {
      console.error('Error in completing tasks to DB');
    })
}

const createOrg = function(email, orgName) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/api/organizations', { email, name: orgName })
    .then((success) => {
      if(success.data === "Organization already created") {
        reject(success.data);
      }
      console.log('Org posted', success);
      resolve()
    })
    .catch((err) => {
      console.log('Error posting Org to DB');
    })
  })
}

export default {  
  login,
  createTask,
  createOrg,
  getTasksByEmail,
  completeTask,
  adminAddUser,
  deleteUserOrgLink
}