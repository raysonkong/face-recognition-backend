const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`app is running on port: ${port}.`)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}));

const database = {
  users: [
    { 
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'john',
      entries: 0,
      joined: new Date()
    },

    {
      id: '124',
      name: 'Mary',
      email: 'mary@gmail.com',
      password: 'mary',
      entries: 0,
      joined: new Date()
    },

    {
      id: '125',
      name: 'steve',
      email: 'steve@gmail.com',
      password: 'steve',
      entries: 0,
      joined: new Date()
    },

    {
      id: '126',
      name: 'joe',
      email: 'joe@gmail.com',
      password: 'joe',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req,res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  let found = false;
  for (let user of database.users) {
    if (user.email === email && user.password === password) {
      res.json("success");
      found = true;
      break;
    }
  }  

  if (!found) {
    res.json("fail")
  }
})

app.post('/register', (req,res) => {
  const { name, email, password } = req.body;

  const newUser = {
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  }

  database.users.push(newUser);

  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  for (user of database.users) {
    if (user.id === id) {
      res.json(user);
      found = true;
      break;
    }
  }

  if (!found) {
    res.json("User not found")
  }
})