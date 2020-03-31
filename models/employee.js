const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  age: {type: String},
  gender: {type: String, default: ""},
  position: {type: String, default: ""}
});


module.exports = mongoose.model("Employee", userSchema);
