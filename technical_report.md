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

### Import Vue Library

Vue allows us to import the entire Vue library and store it locally with out having to download it to memory so we can call on specific functionality throughout the application. It also allows for specific actions such as mounting in which Vue handles the code as one object and controls its content and display
```javascript
<script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
          }
        }
    </script>
```
This code provides an import map which removes the need for hardcoding multiple import paths in multiple places across the code. Import maps provide a centralized way to manage and configure import paths. By removing the need to duplicate code and having the import map stored in one area of code, the code is more maintainable if the code ever needs to be changed or scaled for future uses. 
https://vuejs.org/guide/quick-start


### Virtual DOM

DOM stands for Document Object Module. Vue uses a virtual DOM that stores changes created by the server/ client code. The VDOM is then compared to the previous VDOM and only the changes are implemented to the DOM and then become visible to the user.
```javascript
 const app = createApp(RootComponent)
 const vm = app.mount("#app");
```
By adding the VDOM into the process and comparing it to the previous version, VUE can determine the minimal amount of changes that can be implemented to efficiently change the DOM. This is done by a process called 'diffing' and reduces the need to constantly reload the DOM. Vue can can also batch updates into a single cycle reducing the need for browser reflows and repaints
https://vuejs.org/guide/extras/rendering-mechanism


### Create Instances

Vue makes use of the lifecycle hook 'created()'. This hook allows for methods to be created and initialized before being called upon. This occurs before being mounted to the DOM
```javascript
created() {
            this.getItems();
            this.clearInput();
          },
```
By initializing the item before being called upon and mounted to the DOM we can reduce the time taken for the methods to fetch data pre-requisites that they may need. For example the clear input method ensure that all input fields are cleared when the component is created if this was done after the DOM was rendered we would be adding time to the applications feedback cycle.
https://vuejs.org/guide/essentials/lifecycle

Client Language Features
------------------------

### URL Capture

This code allows for the user to extract the api paramter from the URL query string. This points the methods to the correct server. The code also allows for us to input a default api string if one is not present in the url.
```javascript
const urlParams = new URLSearchParams(window.location.search);
const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');
```
By dynamically configuring the API endpoint without the use of hardcoding we allow developers to provide flexibility in connecting to different API's services. By adding configuration of removing the trailing slash we ensure consistent and reliable construction of API endpoints removing the chance of errors and creating a maintainable application
https://router.vuejs.org/guide/essentials/dynamic-matching

### HTML Forms

HTML forms enable users to provide input and submit data to web servers. Due to the fact that there is a linked button that HTML will view as submit button developes can easily link methods to the forms determining how the inputted data is handled and processed
```html
<form @submit.prevent="addItem">
    <input v-model="item.user_id" name="user_id" placeholder="user_id">
    <input v-model="keywordsInput" name="keywords" placeholder="keywords">
    <textarea v-model="item.description" name="description" placeholder="description"></textarea>
    <input v-model="item.image" name="image" placeholder="image">
    <input v-model="item.lat" name="lat" placeholder="lat">
    <input v-model="item.lon" name="lon" placeholder="lon">
    <button data-action="Create_Item">Create Item</button>
</form>
```
HTML forms provide a standardized and versatile way to collect, process and interact with user input, by incorporating all fields under one form we can ensure that we can handle data as objects and not independent variables. In doing this we remove the need for formatting data and ensure data can be validatted at the point of input
https://vuejs.org/guide/essentials/forms



Conclusions
-----------

Web development frameworks enhance productivity, consistency, and code organization. They provide pre-built components, standardization, and abstraction of complexity, reducing boilerplate code and fostering modularity. Frameworks offer community support, extensive ecosystems, and cross-browser compatibility, ensuring broad accessibility and accelerated development. Security best practices, scalability features, and rapid prototyping tools contribute to robust and secure applications. The structured approach of frameworks facilitates code maintainability, refactoring, and seamless collaboration in large teams. Ultimately, frameworks simplify development, enabling developers to focus on application-specific logic and deliver scalable, maintainable, and efficient web applications.


For a comprehensive and scalable web application, the combination of React.js for the frontend and Django for the backend is recommended. React.js stands out for its component-based architecture, promoting code reusability and maintainability. Its virtual DOM ensures efficient rendering updates, contributing to a seamless user experience. With a vibrant community and a rich ecosystem, React provides extensive support and resources for developers, making it an excellent choice for building interactive Single-Page Applications (SPAs). On the backend, Django is a full-stack framework renowned for its "batteries-included" approach, offering built-in features like authentication, admin interface, and security. Its scalability, well-organized documentation, and strong community make it an ideal choice for projects of various sizes. Django's comprehensive tools, including an Object-Relational Mapping (ORM) system, simplify backend development, allowing developers to focus on building robust applications. The synergistic use of React.js and Django combines the strengths of a powerful frontend library with a feature-rich backend framework, providing a solid foundation for developing modern and maintainable web applications.





