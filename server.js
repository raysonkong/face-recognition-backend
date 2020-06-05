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

app.get('/', (request,response) => {
  response.json(database.users);
})

app.post('/signin', (request, response) => {
  const { email, password } = request.body;
  let hash;
  let found = false;

  for (let login of database.logins) {
    if (login.email === email) {
      found = true;
      hash = login.hash;
    }
  }

  if (!found) {
    response.json("no such user")
  }
  //console.log("Hash Brown: " + hash)
  bcrypt.compare(password, hash, function(err, res) {
    if (res) {
      response.json("success");
    }

    else {
      response.json("wrong password")
    }
  });
  

})

app.post('/register', (req,res) => {
  const { name, email, password } = req.body;

  bcrypt.hash("bacon", null, null, function(err, hash) {
    const newLogin = {
      id: '123',
      email: email,
      hash: hash
    }

    const newUser = {
        id: '123',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    }

    database.users.push(newUser);
    database.logins.push(newLogin);

    console.log("Hash bronw:  " + hash)
    //res.json(database.logins[database.logins.length-1]);
    res.json(database.users[database.users.length-1])
  });
});

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