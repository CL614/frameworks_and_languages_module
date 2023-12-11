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
res.status(200).sendFile("client.html", { root: __dirname })

});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

//defines path to get current date
const currentDate = new Date().toISOString()

let randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

// initializes item with items details
let ITEMS = [
  {
    "id": randomId,
    'user_id': "user1234",
    'keywords': ["hammer", "nails", "tools"],
    "description": "A hammer and nails set. In canterbury",
    "image": "https://i.imgur.com/SCEwQdk.jpeg",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": currentDate,
    "date_to": currentDate

  }
];

app.options('/', (req, res) => {
  res.status(204).set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
  }).end();
});

app.get('/items', (req, res) => {
  res.status(200).json(ITEMS)
})

app.get('/item/:itemId', (req, res) => {
  const specificItemID = parseFloat(req.params.itemId);

  const specificItem = ITEMS.find(specificItem => specificItem.id === specificItemID);

  if (!specificItem){
    console.log("GET /specificItem/{specificItemID} 404 id: " +specificItemID.toString());
    return res.status(404).json({ message: 'Item not found'})
  }

  console.log("GET /specificItem/{specificItemID} 200")
  res.status(200).json(specificItem)
  
})


app.post('/item', (req, res) => {

  let reqFields = ['user_id', 'keywords', 'description', 'image', 'lat', 'lon']
  const enteredFields = Object.keys(req.body).toString().split(',')

  let expectedFields = 5;
  let fields = 0;

  if (enteredFields[3] === 'image' || enteredFields[4] === 'image') {
    expectedFields++;
  }
  else {
    reqFields.splice(3, 1);
  }
  for (let i = 0; i < reqFields.length; i++) {
    if (enteredFields[i] == reqFields[i]) {
      fields++;
    }
  }
  if (fields !== expectedFields) {
    console.log("Missing Data! 405")
    res.status(405).json({ "message": "Missing data" })
  }
  
  let new_item = {
    id: randomId,
    ...req.body,
    date_from: currentDate,
    date_to: currentDate
  }

  ITEMS.push(new_item)
  console.log("Successful Post")
  res.status(201).json(new_item)
  console.log(ITEMS)
  console.log(new_item)


})

app.delete('/item/:itemId', (req, res) => {
  const deleteID = parseFloat(req.params.itemId);
  const itemIndex = ITEMS.findIndex(item => item.id === deleteID);

  if (itemIndex === -1) {
    return res.status(404).json({ "message": "ID does not exist" })
  }
  ITEMS.splice(itemIndex, 1)
  console.log("DELETE 204 id: ", deleteID.toString())
  res.status(204).json()

})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


