Technical Report
================

This report aims to detail and explain the languages, frameworks, and features used in the server and client-side domains of the FreeCycle website.

First, the report will examine why the prototype server and client implementations are not suitable for this project, providing detailed reasons for their inadequacy. Following this, the report will discuss the various features and advantages of the chosen frameworks and languages, highlighting why they are better suited for the project's requirements.


Critique of Server/Client prototype
---------------------

### Overview
Frameworks are essential tools in modern web development, designed to save time, ensure consistency within the codebase, and enhance security and scalability. They provide a structured approach to development that facilitates maintenance and future updates.

Despite these benefits, the prototypes for this project were developed without utilizing a framework, leading to several critical issues.

### Socket/Network Handling
The prototype server employs basic socket programming for handling HTTP requests, which introduces several limitations and potential points of failure. For example:
```python
def serve_app(func_app, port, host=''):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        while True:
            s.listen()
            try:
                conn, addr = s.accept()
            except KeyboardInterrupt as ex:
                break
            with conn:
                data = conn.recv(65535)
                try:
                    request = parse_request(data)
                except InvalidHTTPRequest as ex:
                    continue
```

This implementation is problematic because:

Limited Packet Size: If a packet exceeds 64k, the server will fail to process it correctly.
Lack of Asynchronous Handling: The server can handle only one request at a time, leading to potential crashes under heavy load. Real Python (2024)
Unnecessary Complexity: Python offers built-in libraries for handling HTTP requests, rendering this custom implementation redundant and error-prone. Real Python (2024)

Python has an intergrated function that handles HTTP requests and as such the code above is redundant 

### Routing
The prototype uses a basic and non-expandable routing mechanism, as shown below:
```python
from .views import get_index, get_item, post_item, delete_item, get_items

ROUTES = (
    ('OPTIONS', r'.*', options_response),
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
)

```
Issues with this approach include:

Global and Centralized Routing: All routes are defined in a single location, making the system difficult to manage as it scales.
Limited Flexibility: The use of regular expressions for routing is not scalable and can lead to difficulties in chaining routes. Python.org (2024)


### Recommendation
The prototype's implementation lacks structure and does not save data once created. The client.html document is unstructured, with a haphazard layout, buttons, and functions, making it hard to understand.

Using a framework with inbuilt functions allows for structure and uniformity, making the codebase more readable and maintainable. This leads to concise code, important for maintenance and stability. The ExpressJS framework has been chosen for the server, Vue.js for the client, and Skeleton for the layout framework.


Server Framework Features
-------------------------

### Middleware

Express offers modular and reusable middleware, such as CORS (Cross-Origin Resource Sharing), allowing for cross-origin resource sharing . Express.js (2024)
```javascript
const cors = require('cors');
app.use(cors());
```
Once installed, only two lines of code are required for CORS to run in Express, as shown in the provided snippet. 

CORS (Cross-Origin Resource Sharing) is a browser-friendly security feature that allows access to APIs from different origins. Without CORS, access to the site may be blocked due to default browser behaviors that follow the same-origin policy Mardan (n.d.). This policy restricts web pages from making requests to a different domain than the one that served the web page, causing cross-domain requests to fail. CORS allows for these cross-domain requests to occur securely.Express.js (2024)

### URL Routing

Routing is the mechanism by which an application responds to client requests to specific endpoints using HTTP request methods such as GET, POST, DELETE, and others. In Express, routing is achieved through these HTTP methods, enabling the app to listen for requests and invoke the appropriate function when a match is found. Express.js (2024)
```javascript
app.get('/items', (req, res) => {
  res.status(200).json(Object.values(ITEM));
});
```
Routing establishes a direct communication pathway between the server and the client, selecting the optimal route based on predetermined rules. This ensures that communication paths are straightforward and efficient, reducing latency for the user. Efficient routing helps minimize network communication failures, which can occur when sites take a long time to load, thereby enhancing the overall user experience. Express.js (2024)

### Error Handling
Express includes a default error handler built in. This handler captures and processes errors that occur both synchronously and asynchronously. As a middleware function, it can be added to the end of the function stack, ensuring that any unhandled errors are caught and appropriately managed. Express.js (2024)
```javascript
 app.get('/', (req, res) => {
  throw new Error('BROKEN');
});
```
Having a built-in default error handling system allows errors to be detected and reported efficiently, facilitating more effective debugging. This built-in feature also reduces the need for additional lines of code, streamlining the development process and maintaining cleaner code. Mardan (n.d.)

Server Language Features
-----------------------

### Dynamic Typing

JavaScript’s dynamic typing allows variables to be declared without specifying a variable type (e.g., String, int). At runtime, the program assigns a type to a variable based on its current value. This flexibility enables more concise and adaptable coding, as variables can hold different types of values over their lifetime without explicit type declarations. Mozilla Developer Network (2024)
```javascript
ITEM = {};
```
Not having to explicitly declare a variable type simplifies development, enabling developers to write more concise and flexible code. Dynamic typing allows variables to be assigned different types of values throughout their lifecycle. This means that a variable initially holding a number could later be reassigned to a string or an object, accommodating varying data needs without requiring type conversion or declarations. This flexibility streamlines code development and maintenance, as developers can focus on functionality rather than managing type constraints. Mozilla Developer Network (2024)

### Const
In JavaScript, the `const` keyword is used to declare a variable whose value cannot be reassigned after its initial assignment. This immutability helps maintain predictability in code by preventing accidental changes to the variable's value. Using `const` is ideal for variables that should remain constant throughout the program, enhancing code reliability and readability. By clearly indicating that a variable's value is intended to remain unchanged, `const` helps prevent bugs related to unintended reassignment and ensures that the variable's integrity is preserved. FreeCodeCamp (2019)
```javascript
const app = express();
const port = 8000;
```
Using the keyword Const makes code more predictable and less likely to succumb to bugs. Const also saves the program some time when it compiles as it does not have to figure out whether the value is to be changed. FreeCodeCamp (2019)

Client Framework Features
-------------------------

### Virtual DOM

Vue.js employs a virtual DOM to enhance performance and optimize updates. When changes are made to the application state, Vue.js first updates a virtual representation of the DOM rather than the actual DOM. This virtual DOM is a lightweight copy of the real DOM that reflects the current state of the application. Vue.js (2024)

Here’s how it works:

Update in Virtual DOM: When a change occurs in the application, Vue.js updates the virtual DOM instead of the real DOM. This update is performed on JavaScript data structures, which is typically faster and more efficient.

Diffing Algorithm: Vue.js uses a diffing algorithm to compare the updated virtual DOM with the previous version. It calculates the minimal set of changes required to update the real DOM.

Patch Real DOM: Only the necessary changes—those that differ between the old and new virtual DOM representations—are then applied to the real DOM. This selective update reduces the number of direct manipulations to the DOM, which improves performance.Vue.js (2024)

The virtual DOM approach helps address common performance issues associated with direct DOM manipulation by minimizing the number of updates needed and reducing the overhead of browser rendering processes. This results in faster updates and a more responsive user experience.Vue Mastery (2024)

In Vue.js, a virtual DOM node can be represented as a JavaScript object with properties that describe the structure and content of the DOM element. For example:
```javascript
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: []
};
```
Within this client a virtual DOM could be considered as this:

```JavaScript
     item: {
            user_id: "", 
            keywords: [""], 
            description: "", 
            image: "", 
            lat: "", 
            lon: "", 
          list: [1,2,3],
        }
```
Vue.js (2024)
### Two-Way Data Binding

Vue has an inbuilt directive called v-model that facilitates two-way data binding between an input element and a data property. This means that any changes made to the input element are automatically reflected in the data property, and vice versa. This seamless synchronization helps in creating dynamic and responsive user interfaces with less effort. Vue.js (2024)

```javascript
<input v-model="item.user_id" name="user_id" placeholder="Enter your User Id"/>

```
By using `v-model="name"`, any changes made to the input element will automatically update the `name` property, and any changes to the `name` property will update the input element. This two-way data binding is a powerful feature in Vue.js that simplifies the development process.

The data binding features in Vue.js streamline the process of keeping the user interface (UI) in sync with the underlying data model. This automation reduces the need for manual DOM manipulation and event handling, making it easier to develop dynamic and responsive applications. Additionally, the use of directives like `v-model` helps maintain code readability, allowing developers to focus on application logic rather than boilerplate code. This leads to more efficient and maintainable codebases. Vue.js (2024)

### List Rendering


Vue.js uses a specific directive called v-for to render lists based on arrays. This directive utilizes a special syntax, (item in items), where items represents the source array, and item serves as an alias for each element being iterated over
```javascript
<ul>
    <li v-for="item in list">
        <span data-field="user_id">{{item.user_id}}</span>
        <span data-field="description">{{item.description}}</span>
        <span data-field="keywords">{{item.keywords}}</span>
        <span data-field="image">{{item.image}}</span>
        <span data-field="lat">{{item.lat}}</span>
        <span data-field="lon">{{item.lon}}</span>
        <span data-field="id">{{item.id}}</span>
        <button class="button-primary" data-action="delete" @click="deleteItem(item.id)">Delete</button>
   </li>
</ul>

```
The v-for directive in Vue.js is a powerful tool for dynamically generating and rendering elements based on an array of data. This directive allows developers to iterate over a list of items and create a corresponding set of elements for each item in the list. By using v-for, developers can efficiently handle lists and reduce the need for manual manipulation of the DOM (Document Object Model).

Here’s why v-for is particularly advantageous:

Dynamic Element Generation: v-for automates the creation of elements from an array, making it easier to handle dynamic content. Instead of manually writing code to generate HTML elements for each item, v-for generates them automatically based on the data provided.

Efficient DOM Updates: When data in the array changes, v-for ensures that only the necessary elements are updated. This reduces the need for developers to manually manipulate the DOM, leading to cleaner and more maintainable code.

Reduction in Boilerplate Code: By using v-for, developers can eliminate repetitive code and simplify the process of rendering lists. This not only makes the codebase more readable but also accelerates development by reducing the amount of boilerplate code needed.

Improved Performance: Vue’s reactivity system optimizes how updates are handled. When an item in the list changes, Vue updates only the affected elements rather than re-rendering the entire list. This results in faster updates and a more responsive user experience.

Code Readability and Maintenance: Using v-for enhances code readability by abstracting the complexity of list rendering. This makes it easier for other developers to understand and maintain the codebase, contributing to overall development efficiency.

In summary, the v-for directive is essential for managing dynamic lists in Vue applications. It streamlines the rendering process, enhances performance, and improves code maintainability, thereby contributing significantly to development efficiency.

Client Language Features
------------------------

### Automatic Semicolons
In JavaScript, while some statements explicitly require semicolons (;) to terminate them, the language's automatic semicolon insertion (ASI) feature helps streamline coding by automatically adding semicolons when they are omitted. This feature reduces the likelihood of syntax errors due to missing semicolons and makes the code cleaner and easier to write Mozilla Developer Network (2024). There are specific scenarios in which JavaScript will automatically insert semicolons: 

When an Unallowed Token is Encountered: If the JavaScript parser encounters a token that cannot legally follow the current statement, it will automatically insert a semicolon to terminate the statement. For example, if a line ends with a return statement followed by a newline, JavaScript will insert a semicolon after return to complete the statement Mozilla Developer Network (2024).
```javascript
function example() {
  return
  { key: "value" }
}
// Equivalent to:
function example() {
  return;
  { key: "value" }
}
```

At the End of the Input Stream: When the end of a JavaScript file or script is reached, a semicolon is automatically inserted if it is missing. This ensures that the final statement is properly terminated even if the developer forgets to add a semicolon Mozilla Developer Network (2024).
```javascript
let x = 5
let y = 10
// Equivalent to:
let x = 5;
let y = 10;
```

When Forbidden Line Terminators are Present: JavaScript will insert a semicolon if it detects a line terminator (such as a newline character) in places where a semicolon is expected but omitted. This is done to prevent syntax errors caused by missing semicolons in cases where a new line might otherwise cause issues Mozilla Developer Network (2024).
```javascript
let x = 5
let y = 10
// Equivalent to:
let x = 5;
let y = 10;
```
Understanding ASI helps developers write cleaner and more concise code, although relying on automatic insertion can sometimes lead to unexpected behavior if not properly understood. It is generally good practice to use explicit semicolons to avoid ambiguities and ensure code behaves as intended.

### addEventistener
The addEventListener method in JavaScript attaches a function to an event on a specified element, allowing the function to execute whenever the event occurs. This approach simplifies event handling by enabling reuse of a single function for multiple elements, reducing code repetition and improving maintainability.
```javascript
const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}
```
This feature prevents developers from cluttering their HTML with JavaScript code, resulting in cleaner, more organized code. By separating event handling from HTML structure, it streamlines development and enhances code readability Mozilla Developer Network (2024).

Conclusion
-----------

Incorporating frameworks into the development process brings several compelling benefits that streamline and enhance the overall workflow. Frameworks offer a structured foundation that allows developers to focus on crafting unique project features without getting bogged down by the fundamental aspects of coding. This approach reduces the volume of code needed, minimizes potential bugs, and accelerates the development timeline.

Framework Advantages:
Frameworks provide an organized infrastructure that imposes a standard structure on the codebase. This standardization facilitates easier understanding and maintenance, especially if the project needs to be handed over to another team. The consistency offered by frameworks means that the code adheres to best practices and reduces the need for internal discussions about coding conventions, as many decisions are predetermined by the framework itself. Frameworks with built-in default behaviors, like Vue.js’s v-model for data binding and ExpressJS’s built-in error handling and routing, simplify development by automating common tasks and reducing the amount of custom code required.

JavaScript’s Role:
JavaScript, as a dynamic and versatile language, is particularly well-suited for web development due to its ability to handle interactive features and its compatibility with all modern web browsers. Its dynamic typing and event-driven nature make it ideal for developing both client-side and server-side applications. The language's extensive ecosystem of libraries and middleware components further supports rapid development and enhances functionality.

Selected Frameworks:

ExpressJS: This server-side framework was chosen for its robustness and efficiency in handling server tasks. ExpressJS excels in providing essential features like routing, middleware support, and error handling with minimal setup. Its lightweight nature ensures quick compile times and effective management of server-side logic.

Vue.js: On the client side, Vue.js was selected for its ability to manage complex user interfaces efficiently. Its use of a virtual DOM allows for optimized rendering and faster updates, improving the overall user experience. Vue.js also simplifies the development process with its directives, such as v-model for two-way data binding and v-for for list rendering.

Skeleton: For layout and styling, Skeleton was chosen due to its minimalistic design and lightweight framework. Skeleton provides a clean and modern look while ensuring quick compile times and a straightforward implementation process.

Overall, the integration of these frameworks and technologies contributes to a more efficient development process, a cleaner and more maintainable codebase, and an enhanced user experience. The use of established frameworks like ExpressJS and Vue.js, combined with a streamlined layout framework like Skeleton, creates a robust foundation for developing the FreeCycle website, aligning with best practices and leveraging the strengths of modern web technologies.


Refrences
-----------

Real Python. Socket Programming in Python (Guide). Available at: https://realpython.com/python-sockets/ (Accessed: 24 July 2024).

Python.org. Python Networking Programming. Available at: https://docs.python.org/3/howto/sockets.html (Accessed: 21 July 2024).

Express.js. Express - Node.js web application framework. Available at: https://expressjs.com/ (Accessed: 22 July 2024).

Mardan, A. (n.d.) Express.js Guide: The Comprehensive Book on Express.js. Available at: https://expressjsguide.com/ (Accessed: 23 July 2024).

Mozilla Developer Network (MDN). JavaScript Guide. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide (Accessed: 23 July 2024).

FreeCodeCamp. (2019) Understanding const in JavaScript. Available at: https://www.freecodecamp.org/news/understanding-const-in-javascript/ (Accessed: 24 July 2024).

Vue.js. Vue.js - The Progressive JavaScript Framework. Available at: https://vuejs.org/ (Accessed: 24 July 2024).

Vue Mastery. Introduction to Vue.js. Available at: https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/ (Accessed: 24 July 2024).

Vue.js. Virtual DOM in Vue.js. Available at: https://vuejs.org/v2/guide/render-function.html (Accessed: 21 July 2024).

Vue.js. Vue.js Guide - Forms. Available at: https://vuejs.org/v2/guide/forms.html (Accessed: 21 July 2024).

Vue.js. List Rendering in Vue.js. Available at: https://vuejs.org/v2/guide/list.html (Accessed: 21 July 2024).

Skeleton. Skeleton: A Dead Simple, Responsive Boilerplate. Available at: http://getskeleton.com/ (Accessed: 23 July 2024).

Mozilla Developer Network (MDN). JavaScript Automatic Semicolon Insertion. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion (Accessed: 21 July 2024).

Mozilla Developer Network (MDN). EventTarget.addEventListener(). Available at: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener (Accessed: 24 July 2024).

Mozilla Developer Network (MDN). Cross-Origin Resource Sharing (CORS). Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS (Accessed: 24 July 2024).



