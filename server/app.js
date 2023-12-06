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
    "item_id": 1,
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

  let reqFields = ['user_id', 'keywords', 'description', 'image', 'lat', 'lon' ]
  const enteredFields = Object.keys(req.body).toString().split(',')

  let expectedFields = 5;
  let fields = 0;

  if(enteredFields[3] === 'image' || enteredFields[4] === 'image'){
    expectedFields++;
  }
  else{
    reqFields.splice(3,1);
  }
  for (let i = 0; i < reqFields.length; i++){
    if (enteredFields[i] == reqFields[i]){
      fields++;
    }
  }
   if (fields !== expectedFields){
    console.log("Missing Data! 405")
    res.status(405).json({"message": "Missing data"})
   }
  
   let new_Item = {
    id: Math.random(),
    ...req.body,
    date_from: currentDate,
    date_to: currentDate
   }
    
    ITEMS.push(new_Item)
    console.log("successful Post")
    res.status(201).json(new_Item)
  
})

app.delete('/item:item_id', (req, res) => {
  const ID = (req.params.item_id)

  if (ID === -1)
  {
    return res.status(404).json({"message": "ID does not exist"})
  }
  else{
  ITEMS.splice(ID, 1)
  console.log("DELETE 204 id: ", ID.toString())
  res.status(204).json()
  }
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


