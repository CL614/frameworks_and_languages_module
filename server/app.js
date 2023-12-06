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
app.use(express.urlencoded({ extended: true }))

// loads client.html when server is loaded
app.get('/', (req, res) => {
  //res.send("Hello World");
  res.status(200).sendFile("client.html", {root: __dirname})

});
//defines path to get current date
const currentDate = new Date().toISOString()

// initializes item with items details
let ITEMS = [
  {
    "id": 1,
    "user_id": "Callum123",
    "keywords": [
      "Word1",
      "Word2",
      "Word3",
    ],
    "description": "1111111111111111",
    "image": "https://i.imgur.com/SCEwQdk.jpeg",
    "lat": 12.86568,
    "lon": -67.09876543,
    "date_from": currentDate,
    "date_to": currentDate

  }
];


app.get('/items', (req, res) => {
  res.status(200).json(ITEMS)
})

app.post('/item', (req, res) => {

  if (!req.body.user_id || !req.body.keywords || !req.body.description || !req.body.lat || !req.body.lon) {
    console.log("Missing Data")
    return res.status(405).json()
  }
  else {
    req.body['date_start'] = currentDate
    req.body['date_end'] = currentDate
    req.body['item_id'] = Math.random()
    console.log("About to add item")

    let new_Item = {
      "id": Math.random(),
      "user_ID": req.body.user_id,
      "keywords": req.body.keywords,
      "description": req.body.description,
      "image": req.body.image,
      "latitude": req.body.lat,
      "longitude": req.body.lon,
      "date_start": currentDate,
      "date_end": currentDate,
    };

    ITEMS.push(new_Item)
    console.log("successful Post")
    res.status(201).json(new_Item)
  }
})

app.delete('/item:item_id', (req, res) => {
  //remove using delete and id from dictionary
  res.status(204).json()
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


