"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the user collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
/**
 * @typedef UserModel Represents the User model in mongoose
 */
const UserModel = mongoose_1.default.model('UserModel', UserSchema_1.default);
exports.default = UserModel;
