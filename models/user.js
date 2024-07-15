const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: { type: String, require: true, maxLength: 50},
  last_name: { type: String, require: true, maxLength: 50},
  email: { type: String, require: true, maxLength: 50},
  password: { type: String, require: true, maxLength: 50},
  member_status: 
})

// Virtual for user full name
UserSchema.virtual("full_name").get(function () {
  let fullName = "";
  if(this.first_name && this.last_name) {
    fullName = `${this.last_name}, ${this.first_name}`
  }
  return fullName;
})

// Virtual for user URL
UserSchema.virtual("url").get(function () {
  return `/profile/user/${this._id}`
})