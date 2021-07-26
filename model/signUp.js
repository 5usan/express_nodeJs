const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("SignUp", SignUpSchema);
