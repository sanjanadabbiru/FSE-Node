/**
 * @file DislikesModel implements the mongoose model to CRUD docs in likes collection.
 */
 import mongoose from "mongoose";
 import DislikesSchema from "./DislikesSchema";
 const DislikesModel = mongoose.model('DislikesModel', DislikesSchema);
 export default DislikesModel;