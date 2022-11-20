"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Like shows likes relation between a User and a Tuit.
 * @property {Tuit} likedTuit: the tuit a user liked.
 * @property {User} likedBy: the user liked a tuit.
 */
class Like {
    constructor() {
        this.tuit = null;
        this.likedBy = null;
    }
}
exports.default = Like;
;
