Technical Report
================


This report provides a comprehensive overview of the server and client developed in the initial assignment. Emphasizing a forward-looking perspective, the focus of this analysis lies in the identification of potential challenges and the formulation of recommendations tailored to both the client and server, particularly in scenarios involving deployment or the utilization of larger-scale versions. A critical aspect of the report involves an in-depth examination of the features inherent to the frameworks and languages employed in the development process. Beyond a mere evaluation, the report endeavors to furnish practical insights and informed suggestions for alternative frameworks that could be considered in a professional setting. By exploring the nuances of the implemented server and client, this report aims to offer a strategic perspective, guiding future decisions and actions in the deployment and scaling processes. The overarching objective is to provide a resource that not only addresses immediate concerns but also serves as a valuable reference for potential enhancements and adaptations in professional environments.


Critique of Server/Client prototype
---------------------

### Overview
()

### (Route Defining in example_server)

```python
ROUTES = (
    ('OPTIONS', r'.*', options_response),
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
```

The way these routes are defined creates an issue. Looking especially at the options request. The code means that any option request received by the server will generate the same response. In order to create different response for different option request additional routes would have to be added in, meaning for large scale applications, this would be become unmaintainable.


### Item Object

```javascript
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
```
A list has been used here which as a stand alone object is usable. However paired with the functionality of being able to add and delete items, using a list creates problems in regards to unique indexing. In the case of checking if items are unique with out having a unique identifier the whole objects has to be searched increasing the tikme taken of the feedback cycle.

### Recommendation
The current implementation should not be used as it is not maintainable or scalable. This is due to the limits of certain implementations of key parts of the frameworks such as routing and object handling. On large scale operations this would create errors with option request along side lengthy feedback cycles.
My suggestion for the direction of this implementation would to be use a complex and robust framework such as Django, which hosts a library of resources that removes the need for hard coding commodities and reduces the risks of errors when scaling up.


Server Framework Features
-------------------------

### Middleware

Middleware is a function that has access to both the req and res requests. The middleware can carryout a broad spectrum of functionality on code during the requests.
```javascript
const cors = require('cors')
```
Middleware allows for code to be used on multiple endpoints without the need for code repetition. Middleware can also allow to select if certain endpoints can go around the middleware. Middleware allows the reuse of functionality against a group or specific endpoints. Reducing the duplication of code.


### URL Routing

Express allows the user to code endpoints creating specific routes and functionality depending on the end point selected via the client. 
```javascript
app.get('/items', (req, res) => {
```
Here we can see '/items' is creating a specific endpoint which is called upon in the URL when a certain function is undertaken via the client. This allows for certain actions to undertake certain functions by calling on specific methods. This reduces the need to write duplicate code and makes the code more maintainable when multiple requests are coming in from the client meaning the code is scalable.
https://expressjs.com/en/guide/writing-middleware.html


### Status Codes

A status code is a numerical value that equivocates to a certain message. Servers use these to communicate errors that they have encountered during the codes lifecycle. For example '404' means the server could not find the client requested web page.
```javascript
 res.status(200).json(ITEMS)
```
This code allows us to send status codes to the client so we can communicate what is happening with in the server code. By doing this we can easily diagnose why a request can't be fulfilled, and as such developers can easily rectify issues within the code. On top of this it also allows for non technical literate users to interpret issues with the service they are attempting to use.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


Server Language Features
-----------------------

### Objects parsed via the client

We can parse an object from the client to the server. Javascript can then read this as an object. This means that all data handled by the client can be parsed to the server and handled via the back end this supports asynchronous coding 
```javascript
const specificItemID = parseFloat(req.params.itemId);
```
As we can see above 'req.params' references to the body that has been parsed from the client to the server. BY ensuring that data is handled via the server we ensure that values and functionality is removed from the user facing code. This heightens the security of the code as values can not be changed by the user via the built in console of web browsers. 



### .JSON 

.JSON allows for objects to be parsed via JSON from the server to the client. JSON stands for JavaScript Object Notation. It is used for formatting objects before being sent to the client web page.
```javascript
res.status(201).json(new_item)
```
Above we can see '.JSON(new_item)'. The object 'new_item' is being parsed from the server to the client. Without '.JSON' we would have to format the object via hard code, this function removes the need of doing this and therefore removes the need for more lines of code. By allowing the system to autonomously format the object we remove the risk of error and create a more maintainable code environment.
https://www.w3schools.com/whatis/whatis_json.asp



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)




