/**
 * @file Represents Tuit.
 */

import User from "./User";
import Stats from "./Stats";
/**
 * @typedef Tuit represents the tuit message posted.
 * @typedef User: represented the user it was posted by.
 * @property {Date} postedOn: the date it was posted on.
 * @property {User} postedBy: the user it was posted by.
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
   stats: Stats | null = null;
}