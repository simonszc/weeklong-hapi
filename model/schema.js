//schema
'use strict'

const mongoose = require('mongoose')
const Kitty = new mongoose.Schema({
  name: {type: String, unique: true},
  breed: String,
  color: String,
  gender: String,
  quote: String
});

module.exports = mongoose.model('cat', Kitty)
