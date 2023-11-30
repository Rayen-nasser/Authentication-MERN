const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  userName: {
    type: String,
    required: true, // Change "require" to "required"
    unique: true,
  },
  password: {
    type: String,
    required: true, // Change "require" to "required"
  },
});

const AdminModel = model("admins", AdminSchema);
module.exports = AdminModel; // Corrected export statement
