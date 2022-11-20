/**
 * @file Stats declares the stats of tuit.
 * @typedef Stats: gives the coordiantes of a user.
 * @property {number} replies: precise longitudue of user's location.
 * @property {number} likes: precise latitude of user's location.
 * @property {number} retuits: precise latitude of user's location.
 */
 export default class Stats {
    public replies: number = 0;
    public retuits: number = 0;
    public likes: number = 0;
    public dislikes: number = 0;
 };