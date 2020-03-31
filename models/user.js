const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String},
  role: {type: String, default: ""},
  contact: {type: String, default: ""}
});

userSchema.methods.encryptPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema);
