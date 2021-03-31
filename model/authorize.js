const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  amount: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 255
  },
  
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  
 
}
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
      amount: Joi.string()
      .min(0)
      .max(255),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;
