/**
 * @file Implements mongoose schema to CRUD for
 * documents in the user collection
 */
import mongoose from "mongoose";
/**
 * @typedef UserSchema Represents user schema in mongoose
 * @property {string} username username
 * @property {string} password password
 * @property {string} firstName first name of user
 * @property {string} lastName last name of user
 * @property {string} email email
 * @property {string} profilePhoto profile photo of user
 * @property {string} headerImage image of header
 * @property {string} accountType type of account
 * @property {string} maritalStatus status of marriage
 * @property {string} biography biography
 * @property {Date} dateOfBirth date of birth
 * @property {Date} joined date of joining
 * @property {string} location location of user

 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;