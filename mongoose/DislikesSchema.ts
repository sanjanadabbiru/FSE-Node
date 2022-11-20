/**
 * @file imports mongoose schema for Dislikes.
 */
 import mongoose, { Schema } from "mongoose";
 /**
   * @typedef DislikesSchema is how Dislikes are represented.
   * @property {ObjectId} userid: primary key of user who liked tuit.
   * @property {ObjectId} tid: primary key of tuit liked.
 */
 const DislikesSchema = new mongoose.Schema({
    dislikedTuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref:"UserModel"}
 }, {collection: 'dislikes'});
 export default DislikesSchema;