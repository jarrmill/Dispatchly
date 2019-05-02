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

const createTask = function(title, division, organization, assigned) {
  axios.post('http://localhost:3000/api/tasks', { title, division, organization, assigned })
    .then((success) => {
      console.log('Success!')
    })
    .catch((err) => {
      console.log('Error posting task to DB');
    })
}

export default { login, createTask }