const express = require('express');
const app = express();
const port = 3001;
const bcrypt = require('bcrypt-nodejs');

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
      entries: 0,
      joined: new Date()
    },

    {
      id: '124',
      name: 'Mary',
      email: 'mary@gmail.com',
      entries: 0,
      joined: new Date()
    },

    {
      id: '125',
      name: 'steve',
      email: 'steve@gmail.com',
      entries: 0,
      joined: new Date()
    },

    {
      id: '126',
      name: 'joe',
      email: 'joe@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],

  logins: [
    {
      id: '123',
      hash: '',
      email: 'hello@gmail.com'
    }
  ]
}

app.get('/', (req,res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
  let found = false;
  for (let login of database.logins) {
    const correctPassword = bcrypt.compareSync(password, login.hash);

    if (user.email === email && correctPassword) {
      res.json("success");
      found = true;
      break;
    }
  }  

  if (!found) {
    res.status(400). json("fail")
  }
})

app.post('/register', (req,res) => {
  const { name, email, password } = req.body;
  let passwordHash = bcrypt.hashSync(password);

  const newUser = {
      id: '123',
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
  }

  const newLogin = {
    id: '123',
    email: email,
    hash: passwordHash
  }

  database.users.push(newUser);
  database.logins.push(newLogin);

  //console.log(database.logins[database.logins.length-1].hash);
  //console.log(database.logins[database.logins.length-1])
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
    res.status(400).json("User not found")
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  for (let user of database.users) {
    if (user.id === id) {
      found = true;
      user.entries += 1;
      res.json(user.entries);
      break;
    }
  }
  if (!found) {
    res.status(400).json("Incorrect ID");
  }
})