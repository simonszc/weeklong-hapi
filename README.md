# weeklong-hapi

This repo represents a weekend project for Codefellows 401 Javascript class.

This codebase will use the hapi middleware framework with mongodb.

A GET request to /cat will return a list of each "cat" in our database. POST will save a new cat, PUT with an id in the url will replace a cat, and DELETE with an id in the url will remove an instance of cat.

'Hapi' is different in several ways from Express. It generally takes more explicit objects than Express, working on the properties of said objects. For example, on server connection we passed in an object with properties of host and port to define the connection (where in express we passed in the host to the .use() method and called it, and then later declared our port in the .listen() method.), and where in express we passed in a routes module ( with REST methods defined on it after express.Router() was called) and handlers declared a a callback to the listener for that event, here we passed in an array of objects (each representing a route), each with three properties: method, url, and handler. So same basic information, formatted in a different way.
