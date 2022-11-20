"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the tuit collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema_1 = __importDefault(require("./TuitSchema"));
/**
 * @typedef TuitModel Represents the Tuit model in mongoose
 */
const TuitModel = mongoose_1.default.model('TuitModel', TuitSchema_1.default);
exports.default = TuitModel;
