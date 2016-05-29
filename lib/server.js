'use strict';

const routes = require(__dirname + '/../routes/router');
const Hapi = require('hapi');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');

const PORT = process.env.PORT || 5000;

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: PORT
});

server.start((err) => {
  if(err) throw err;
  console.log('Server running at:', server.info.uri);
})

server.route(routes);
module.exports = server;
