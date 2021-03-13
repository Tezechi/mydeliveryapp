//19- Require mongoose first. Then use mongoose schema object to create our user schems 20
const mongoose = require('mongoose');

//20 Mongoose schema. Then use it to create our User Schema 21
const Schema = mongoose.Schema;
//21 Create the scheme here. After creating the user schema, rem to export it as below 22
const UserShema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Users = mongoose.model('users', UserShema);
module.exports = Users;
