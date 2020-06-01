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
    }
  ]
}

app.get('/', (req,res) => {
  res.json("App is running!");
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  let found = false;
  database.users.forEach(user => {
    if (user.email === email && user.password === password) {
      found = true;
      res.json("success");
    }
  })

  if (!found) {
    res.json("fail")
  }
})