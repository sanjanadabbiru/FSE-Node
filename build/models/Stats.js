"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Stats declares the stats of tuit.
 * @typedef Stats: gives the coordiantes of a user.
 * @property {number} replies: precise longitudue of user's location.
 * @property {number} likes: precise latitude of user's location.
 * @property {number} retuits: precise latitude of user's location.
 */
class Stats {
    constructor() {
        this.replies = 0;
        this.retuits = 0;
        this.likes = 0;
        this.dislikes = 0;
    }
}
exports.default = Stats;
;
