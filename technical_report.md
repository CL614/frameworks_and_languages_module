Technical Report
================


This report provides a comprehensive overview of the server and client developed in the initial assignment. Emphasizing a forward-looking perspective, the focus of this analysis lies in the identification of potential challenges and the formulation of recommendations tailored to both the client and server, particularly in scenarios involving deployment or the utilization of larger-scale versions. A critical aspect of the report involves an in-depth examination of the features inherent to the frameworks and languages employed in the development process. Beyond a mere evaluation, the report endeavors to furnish practical insights and informed suggestions for alternative frameworks that could be considered in a professional setting. By exploring the nuances of the implemented server and client, this report aims to offer a strategic perspective, guiding future decisions and actions in the deployment and scaling processes. The overarching objective is to provide a resource that not only addresses immediate concerns but also serves as a valuable reference for potential enhancements and adaptations in professional environments.


Critique of Server/Client prototype
---------------------

### Overview
A client-server application is a software system that highlights the core interaction between clients and servers in a divided architecture. It consists of two main components: the client, representing the user interface initiating requests, and the server, managing and responding to these requests. The application emphasizes essential functionality like user authentication, data retrieval, and storage, focusing on communication protocols and data flow between the client and server. The client-side interface is simplified, while the server side emphasizes processing logic and response provision. Additionally, considerations such as scalability, performance, and basic security measures are addressed, offering a testing environment for identifying and resolving potential issues in the application's functionality. Acting as a foundation for subsequent development, the system includes placeholders for future enhancements and additional features, providing a visual representation of the essential elements within the client-server architecture.

### Route Defining in example_server

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
A list has been used here which as a stand alone object is usable. However paired with the functionality of being able to add and delete items, using a list creates problems in regards to unique indexing. In the case of checking if items are unique with out having a unique identifier the whole objects has to be searched increasing the time taken of the feedback cycle.

### Recommendation
The existing implementation is deemed unsuitable for use due to its lack of maintainability and scalability, primarily stemming from limitations in key components like routing and object handling within the frameworks. The current constraints pose a risk of errors, especially during large-scale operations, compounded by issues such as option requests and prolonged feedback cycles. To address these shortcomings, my recommendation is to pivot towards a more sophisticated and robust framework, such as Django. This framework boasts a comprehensive library of resources that eliminates the necessity for hard-coding commodities and significantly mitigates the potential for errors, particularly when scaling up the application. The adoption of Django would enhance the overall reliability, maintainability, and scalability of the implementation.


Server Framework Features
-------------------------

### Middleware

Middleware is a function that has access to both the req and res requests. The middleware can carryout a broad spectrum of functionality on code during the requests.
```javascript
const cors = require('cors')
```
Middleware serves as a pivotal component in software development by facilitating the reuse of code across multiple endpoints, thereby eliminating the need for repetitive coding. This functionality extends to providing the flexibility to exempt specific endpoints from the middleware if required. Through this mechanism, middleware enables the selective application of shared functionality to either a defined group of endpoints or specific ones. The overarching benefit is a significant reduction in code duplication, promoting efficiency and maintainability in the development process. This modular approach enhances code organization and streamlines the implementation of common functionalities throughout the application, contributing to a more robust and scalable system architecture.

### URL Routing

Express allows the user to code endpoints creating specific routes and functionality depending on the end point selected via the client. 
```javascript
app.get('/items', (req, res) => {
```
In this context, the creation of the '/items' endpoint is integral to the implementation, providing a designated access point invoked in the URL when specific client actions are undertaken. This design enables the execution of distinct functions by calling specific methods associated with the endpoint. The strategic use of endpoints minimizes the necessity for redundant code, thereby enhancing code maintainability. As multiple client requests are accommodated, the implementation proves scalable, streamlining the codebase and ensuring efficient handling of diverse functionalities. This approach not only reduces redundancy but also contributes to a more organized and scalable code structure, facilitating easier management and expansion of the system.
https://expressjs.com/en/guide/writing-middleware.html


### Status Codes

A status code is a numerical value that equivocates to a certain message. Servers use these to communicate errors that they have encountered during the codes lifecycle. For example '404' means the server could not find the client requested web page.
```javascript
 res.status(200).json(ITEMS)
```

The provided code enables the transmission of status codes to the client, serving as a vital communication bridge to convey the server's internal processes. This functionality proves instrumental in diagnosing the reasons behind unfulfilled requests, empowering developers to efficiently address and rectify issues within the codebase. Moreover, the incorporation of status codes enhances user experience, enabling non-technical users to comprehend and interpret issues with the service they are attempting to use. This transparent communication not only aids in troubleshooting and debugging from a developer's perspective but also contributes to user-friendly interactions, ensuring a more inclusive understanding of the system's status and potential issues.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


Server Language Features
-----------------------

### Objects parsed via the client

We can parse an object from the client to the server. Javascript can then read this as an object. This means that all data handled by the client can be parsed to the server and handled via the back end this supports asynchronous coding 
```javascript
const specificItemID = parseFloat(req.params.itemId);
```
In the highlighted code snippet, the reference to 'req.params' indicates the utilization of parsed data sent from the client to the server. By centralizing data handling within the server, values and functionalities are abstracted from user-facing code, thereby bolstering the security of the application. This approach minimizes the risk of unauthorized manipulation by users through web browser consoles, as critical values are shielded from direct user access. The separation of concerns between client and server, in terms of data handling, not only enhances security but also promotes a more robust architecture by encapsulating sensitive operations within the server-side logic.



### .JSON 

.JSON allows for objects to be parsed via JSON from the server to the client. JSON stands for JavaScript Object Notation. It is used for formatting objects before being sent to the client web page.
```javascript
res.status(201).json(new_item)
```
In the provided snippet, '.JSON(new_item)' demonstrates the parsing of the 'new_item' object from the server to the client. This approach eliminates the necessity for manual object formatting through hard coding. The use of '.JSON' streamlines the process, reducing the codebase and mitigating the risk of errors associated with manual formatting. Allowing the system to autonomously handle the object's format not only enhances code maintainability but also fosters a more robust and error-resistant code environment. This approach promotes efficiency by leveraging built-in functionalities, contributing to a streamlined and reliable communication process between the server and client components.
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
The code introduces an import map, a mechanism that eliminates the necessity for hardcoding multiple import paths in various sections of the code. With import maps, import paths are centrally managed and configured, reducing redundancy and enhancing maintainability. This centralized approach eliminates the need to duplicate import-related code across different parts of the application. Storing the import map in a single location streamlines code management and proves advantageous when modifications or scaling for future use are required. Consequently, the codebase becomes more maintainable, as changes and expansions can be implemented efficiently and consistently by referencing the centralized import map.
https://vuejs.org/guide/quick-start


### Virtual DOM

DOM stands for Document Object Module. Vue uses a virtual DOM that stores changes created by the server/ client code. The VDOM is then compared to the previous VDOM and only the changes are implemented to the DOM and then become visible to the user.
```javascript
 const app = createApp(RootComponent)
 const vm = app.mount("#app");
```

The incorporation of Virtual DOM (VDOM) in Vue.js introduces a mechanism for efficiently updating the Document Object Model (DOM). Through a process known as 'diffing,' Vue.js can discern the minimal changes required by comparing the current VDOM state with the previous version. This strategy minimizes the need for frequent reloading of the entire DOM, enhancing performance. Additionally, Vue.js optimizes updates by batching them into a single cycle, thereby reducing the occurrence of browser reflows and repaints. The implementation of VDOM in Vue.js contributes to a more responsive and streamlined user interface, enhancing the overall efficiency and user experience of web applications built with the framework.
https://vuejs.org/guide/extras/rendering-mechanism


### Create Instances

Vue makes use of the lifecycle hook 'created()'. This hook allows for methods to be created and initialized before being called upon. This occurs before being mounted to the DOM
```javascript
created() {
            this.getItems();
            this.clearInput();
          },
```
By initializing the item before it is called upon and mounted to the DOM, we can optimize the performance of methods that fetch data prerequisites. For instance, the clear input method ensures that all input fields are cleared when the component is created. If this initialization were deferred until after the DOM is rendered, it would introduce additional time to the application's feedback cycle. The proactive approach of initializing the item before mounting streamlines the process, reducing the time it takes for methods to execute and enhancing the overall responsiveness of the application.
https://vuejs.org/guide/essentials/lifecycle

Client Language Features
------------------------

### URL Capture

This code allows for the user to extract the api paramter from the URL query string. This points the methods to the correct server. The code also allows for us to input a default api string if one is not present in the url.
```javascript
const urlParams = new URLSearchParams(window.location.search);
const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');
```

Dynamic configuration of the API endpoint, rather than hardcoding it, offers developers flexibility to connect to different API services. This approach allows for easy adaptation to varying endpoints without altering the source code. Moreover, the inclusion of configuration options, such as removing trailing slashes, ensures the consistent and reliable construction of API endpoints. This consistency minimizes the likelihood of errors and contributes to the creation of a more maintainable application. Developers can efficiently manage and update API configurations without the need for extensive code modifications, enhancing the adaptability and robustness of the software.
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
HTML forms offer a standardized and versatile mechanism for collecting and processing user input. By consolidating all relevant fields under a single form, we can handle data as cohesive objects rather than independent variables. This approach eliminates the need for formatting data, promoting consistency and simplifying data handling. Additionally, grouping fields within a form facilitates the implementation of centralized validation processes at the point of input. By structuring data in this way, the form becomes a more cohesive and manageable unit, enhancing the efficiency and reliability of the data collection and validation processes within the application.
https://vuejs.org/guide/essentials/forms



Conclusions
-----------

Web development frameworks enhance productivity, consistency, and code organization. They provide pre-built components, standardization, and abstraction of complexity, reducing boilerplate code and fostering modularity. Frameworks offer community support, extensive ecosystems, and cross-browser compatibility, ensuring broad accessibility and accelerated development. Security best practices, scalability features, and rapid prototyping tools contribute to robust and secure applications. The structured approach of frameworks facilitates code maintainability, refactoring, and seamless collaboration in large teams. Ultimately, frameworks simplify development, enabling developers to focus on application-specific logic and deliver scalable, maintainable, and efficient web applications.


For a comprehensive and scalable web application, the combination of React.js for the frontend and Django for the backend is recommended. React.js stands out for its component-based architecture, promoting code reusability and maintainability. Its virtual DOM ensures efficient rendering updates, contributing to a seamless user experience. With a vibrant community and a rich ecosystem, React provides extensive support and resources for developers, making it an excellent choice for building interactive Single-Page Applications (SPAs). On the backend, Django is a full-stack framework renowned for its "batteries-included" approach, offering built-in features like authentication, admin interface, and security. Its scalability, well-organized documentation, and strong community make it an ideal choice for projects of various sizes. Django's comprehensive tools, including an Object-Relational Mapping (ORM) system, simplify backend development, allowing developers to focus on building robust applications. The synergistic use of React.js and Django combines the strengths of a powerful frontend library with a feature-rich backend framework, providing a solid foundation for developing modern and maintainable web applications.





