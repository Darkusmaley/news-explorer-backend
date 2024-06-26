const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name cannot be less than 2 characters"],
    maxlength: [30, "Name cannot be More than 30 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The email field is required"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  if (!password) {
    return Promise.reject(new Error("Incorrect email or password"));
  }
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        console.log(user.email, user.password);
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
