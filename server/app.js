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
ITEM = {
  1: {
    "id": 1,
    "user_id": "User1",
    "keywords": ["saw","wood","tools"],
    "description": "A saw and wood ",
    "image":"https://placekitten.com/200/300",
    "latitude": 37.38797546109132, 
    "longitude": -122.05688209785687,
    "date_start": currentDate,
    "date_end": currentDate,

  },
};
//returns all Items
app.get('/items', (req, res) => {
  res.status(200).json(Object.values(ITEM))
  console.log(ITEM)
})

//return item using item ID
app.get('/item/:id', (req, res) => {
  const ID = req.params.id
// if ID can not be found display error message and generate 404 code
  if (!item[id])
  {
    console.log("Item not found")
    res.status(404).json()
  }
  console.log (ITEM[ID])
  return res.status(200).json(ITEM[ID])
})

//create item 
app.post('/item', (req, res, next) =>
{
  // ensures new item has all required fields
  const fields = ["id", "keywords", "description", "latitude", "longitude"];
  // if fields are not all there creates a message and error code
  if(!fields.every(field=>req.body.hasOwnProperty(field)))
  {
    console.log("Missing Data")
    return res.status(405).json()
  }

//create new object 
const newItem = {};
// Assign a random number to the items ID (on large scale collisions possible)
const newID = Math.random();

for(let [key, value] of Object.entries(req.body)){newItem[key] = value;}

// takes all input and collates to new ID
ITEM[newID] = {
  "id": newID,
    "user_id": req.body.user_id,
    "keywords": req.body.keywords,
    "description": req.body.description,
    "image":req.body.image,
    "latitude": req.body.latitude, 
    "longitude": req.body.longitude,
    "date_start": currentDate,
    "date_end": currentDate,

},
// creates status code and displays all items 
res.status(201).json(Item[newID])
console.log(Object.entries(ITEM[newID]))
})

//deletes item using the items ID
app.delete('/item/:id', (req, res) => {
  const id = req.params.id
//searches through items and matches ID then deletes
  if(ITEM[id]){
    delete ITEM[id]
    console.log("Item Deleted")
    return res.status(204)
  }
  else
  console.log("The item you are trying to delete does not exist")
  res.status(404).json()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


