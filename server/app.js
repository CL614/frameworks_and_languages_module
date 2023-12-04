//import Express
const express = require('express')
//configure port and application
const port = 8000
const app = express()
// import path utilities and CORS handling middleware
const path = require('path')
const cors = require('cors')

//set up middleware to parse JSON requests
app.use(express.json())
// sets up middleware for cors
app.use(cors())
//sets up middleware for handling URL payloads
app.use(express.urlencoded({extended: true}))

// creates welcome message
app.get('/', (req, res) => {
res.send("Hello World");
 
});
//defines path to get current date
const currentDate = new Date().toISOString()

// initializes item with items details
let ITEMS = {
  1: {
    "id": 1,
    "keywords": ["saw","wood","tools"],
    "description": "A saw and wood ",
    "image":"https://placekitten.com/200/300",
    "latitude": 37.38797546109132, 
    "longitude": -122.05688209785687,
    "date_start": currentDate,
    "date_end": currentDate,

  },
};


app.get('/items', (req, res) => {
 res.json(ITEMS)
})

app.post('/item', (req, res) => {
  let new_key = Math.random()
  //ITEMS = { new_key :  }
  console.log(ITEMS)
  res.status(201).json()
 })

 app.delete('/item:item_id', (req, res) => {
  //remove using delete and id from dictionary
  res.status(204).json()
 })




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


