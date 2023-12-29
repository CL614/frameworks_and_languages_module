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

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### Status Codes

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### Dynamic values via the URL

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### .JSON Library

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



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




