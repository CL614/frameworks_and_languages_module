Server
======

This document describes the server side of Assignment 1. It also contains curl commands that allows you to test the server via the terminal

---------------------

### Running the server locally

To run the server in the terminal first you must enter the correct directory 

```python
cd server
```

Then you must run the server 

```python
node app.js
```

The server will now be running on port 8000. To stop the server from running press Ctrl + C in the terminal.

### Running the server in container

To run the server in a container enter the following into the terminal

```make
make build && make run
```

## Curl Commands

### Post 

This command will allow you to add a new item to the server

```
$ curl -X POST http://localhost:8000/item -H "Content-type : application/json" -d {"user_id":"user1234, "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nail set. In canterbury", "lat": 51.5678789, "lon": 1.98765}
```

### GET

Use this request to get a list of all items being stored on the server

```
$ curl -X GET http:localhost:8000/items
```

To create a easier to read format we can use the '| jq' command

```
$ curl -X GET http:localhost:8000/items | jq
```

### GET item by ID

To get a specific item using the Item ID we can use the following command (replacing ID with the ID that you would like)

```
$ curl -X GET http:localhost:8000/item/ID
```

### Delete

To delete an Item using its Item ID we can use the following command (replacing ID with the ID that you would like)

```
$ curl -X DELETE http:localhost:8000/item/ID
```