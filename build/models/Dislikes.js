"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Dislikes shows Dislikes relation between a User and a Tuit.
 * @property {Tuit} dislikedTuit: the tuit a user disliked.
 * @property {User} dislikedBy: the user disliked a tuit.
 */
class Dislikes {
    constructor() {
        this.dislikedTuit = null;
        this.dislikedBy = null;
    }
}
exports.default = Dislikes;
;
