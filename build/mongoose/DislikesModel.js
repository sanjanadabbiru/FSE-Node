"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file DislikesModel implements the mongoose model to CRUD docs in likes collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const DislikesSchema_1 = __importDefault(require("./DislikesSchema"));
const DislikesModel = mongoose_1.default.model('DislikesModel', DislikesSchema_1.default);
exports.default = DislikesModel;
