const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io')();

const app = express();
const port = 3000;
const io_port = 3001;

const { Users,
        Tasks,
        Organizations,
        UserOrganizations,
      } = require('./database');

app.use(express.static('public'));
app.use(bodyParser.json())

//socket.io stuff
io.listen(io_port)
console.log(`IO listening on port ${io_port}.`);

io.on('connection', (client) => {
  client.on('subscribeToTasks', (foo) => {
    console.log('client is subscribing ot task with foo, ', foo);
    client.emit('newTasks', new Date());
  })
})
//
app.get('/api/users', (req, res) => {
  let { email } = req.headers;
  Users.selectUserByEmail
    .then((user) => {
      if(user.rows){
        res.send(users.rows);
      } else {
        //user was just created;
      }
    })
    .catch((error) => {
      console.error('Error in GET users, ', error)
      res.send();
    })
})
app.post('/api/users', (req, res) => {
  const { email, name } = req.body;
  Users.createUser(email, name)
    .then((success) => {
      res.status(202);
      res.send('Success!')
    })
    .catch((err) => {
      res.send(err)
    })
})
app.get('/api/tasks', (req, res) => {
  const { email } = req.headers;
  Tasks.getTasksByEmail( email )
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.error('Error in GET tasks', err);
      res.send();
    })
});
app.get('/api/sockets', (req, res) => {
  io.emit('newTasks', new Date())
  res.send('Did you get it?');
})
app.post('/api/tasks', (req, res) => {
  const { title, division, organization, task_status, assigned} = req.body;
  Tasks.createTask(title, division, task_status, assigned, organization)
    .then((success) => {
      io.emit('newTasks', new Date())

      res.status(200);
      res.send();
    })
    .catch((error) => {
      res.status(300);
      console.error('Error in POST tasks', error);
      res.send();
    })
})
app.put('/api/tasks', (req, res) => {
  const { title } = req.body;
  Tasks.updateByTitle(title)
    .then((success) => {
      console.log('Updated task! ', title);
      io.emit('newTasks', new Date())
      res.status(202);
      res.send();
    })
    .catch((error) => {
      res.status(200);
      console.error('Error in PUT tasks', error);
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
  const { email, name } = req.body;
  Organizations.createOrganization(name)
    .then((data) => {
      UserOrganizations.createEntry(email, name)
        .then((success) => {
          res.status(200);
          res.send();
        })
        .catch((error) => {
          console.error('Error in POST org. ', error);
          res.send();
        })
      res.send();
    }).catch((error) => {
      console.error('Problem in POST organizations. ', error);
      res.send();
    })
});
//Routing workaround
app.get('/organizations', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})
app.get('/login', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})
app.listen(port, () => console.log(`Dispatch App listening on port ${port}!`));

