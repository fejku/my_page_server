import mongoose, { Document } from "mongoose";
import Waga from "../interfaces/IWaga";

const WagaSchema = new mongoose.Schema({
  data: Date,
  waga: Number,
});

const WagaModel = mongoose.model<Waga & Document>("Waga", WagaSchema, "wagi");

export default WagaModel;


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  }]
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  };

  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next();
    }
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    } else {
      if(!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this)
    }    
  })
}

module.exports = mongoose.model("User", UserSchema);