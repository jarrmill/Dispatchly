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
const createTask = function(title, division, organization, assigned) {
  axios.post('http://localhost:3000/api/tasks', { title, division, organization, task_status: 'New', assigned })
    .then((success) => {
      console.log('Success!')
    })
    .catch((err) => {
      console.log('Error posting task to DB');
    })
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
  axios.post('http://localhost:3000/api/organizations', { email, name: orgName })
    .then((success) => {
      console.log('Org posted');
    })
    .catch((err) => {
      console.log('Error posting Org to DB');
    })
}

export default {  
  login,
  createTask,
  createOrg,
  getTasksByEmail,
  completeTask
}