"use strict";
/**
 * @file Represents Tuit.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Tuit represents the tuit message posted.
 * @typedef User: represented the user it was posted by.
 * @property {Date} postedOn: the date it was posted on.
 * @property {User} postedBy: the user it was posted by.
 */
class Tuit {
    constructor() {
        this.tuit = '';
        this.postedOn = new Date();
        this.postedBy = null;
        this.stats = null;
    }
}
exports.default = Tuit;
