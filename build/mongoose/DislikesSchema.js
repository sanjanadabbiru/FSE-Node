"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file imports mongoose schema for Dislikes.
 */
const mongoose_1 = __importStar(require("mongoose"));
/**
  * @typedef DislikesSchema is how Dislikes are represented.
  * @property {ObjectId} userid: primary key of user who liked tuit.
  * @property {ObjectId} tid: primary key of tuit liked.
*/
const DislikesSchema = new mongoose_1.default.Schema({
    dislikedTuit: { type: mongoose_1.Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" }
}, { collection: 'dislikes' });
exports.default = DislikesSchema;
