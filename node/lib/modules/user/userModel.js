// Importing mongoose
var mongoose = require("mongoose");
const constants = require("../../constants");
const bcrypt = require("bcryptjs");
require("dotenv").config;
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    usr_firstname: { type: String },
    usr_lastname: { type: String },
    usr_email: { type: String },
    usr_phone: { type: String },
    usr_dob: { type: String },

    usr_password: { type: String },
    usr_image: { type: String },
    
    usr_jwt: { type: String },
    usr_is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'usr_created_at', updatedAt: "usr_updated_at" },
    versionKey: false
});

// Export user module
let User = module.exports = mongoose.model(constants.DB_MODEL_REF_NEW.USERS, UserSchema);
