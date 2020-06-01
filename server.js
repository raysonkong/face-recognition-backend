const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`app is running on port: ${port}.`)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}));

const database = [
  { 
    id: '123',
    name: "Amy",
    email: "amy@gmail.com",
    password: "123",
    entries: 0,
    joined: new Date()
  },
  
  { 
    id: '123',
    name: "Amy",
    email: "amy@gmail.com",
    password: "123",
    entries: 0,
    joined: new Date()
  },

]


app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.post('/signin', (req, res) => {
    res.json("signing")
})