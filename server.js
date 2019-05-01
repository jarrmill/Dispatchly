const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { Users, Tasks, Organizations } = require('./database');

app.use(express.static('public'));
app.use(bodyParser.json())

app.get('/api/users', (req, res) => {
  Users.selectAllUsers()
    .then((users) => {
      res.send(users.rows);
    })
    .catch((error) => {
      console.error('Error in GET users, ', error)
      res.send();
    })
  res.send();
})
app.post('/api/users', (req, res) => {
  const { email, name } = req.body;
  Users.createUser(email, name)
    .then((success) => {
      res.status(402);
      res.send('Success!')
    })
    .catch((err) => {
      res.send(err)
    })
})
app.get('/api/tasks', (req, res) => {
  Tasks.selectAllTasks()
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.error('Error in GET tasks', err);
      res.send();
    })
});

app.post('/api/tasks', (req, res) => {
  const { title, division, organization, assigned} = req.body;
  Tasks.createTask(title, division, organization, assigned)
    .then((success) => {
      res.status(402);
      res.send();
    })
    .catch((error) => {
      res.status(400);
      console.error('Error in POST tasks', error);
      res.send();
    })
})

app.get('/api/organizations', (req, res) => {
  Organizations.selectAllOrganizations()
    .then((data) => {
      res.send(data.rows);
    })
    .catch((error) => {
      console.error(error);
      res.send();
    })
})

app.post('/api/organizations', (req, res) => {
  const { name } = req.body;
  Organizations.createOrganization(name)
    .then((data) => {
      res.status(402);
      res.send();
    }).catch((error) => {
      console.error('Problem in POST organizations. ', err);
      res.send();
    })
});

app.listen(port, () => console.log(`Dispatch App listening on port ${port}!`));

