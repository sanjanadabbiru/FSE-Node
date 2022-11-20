/**
 * @file represents the Dislikes datatype between user and tuit. the relation being user
 * Dislikes or unlkes a tuit.
 */
 import Tuit from "./Tuit";
 import User from "./User";
 /**
  * @typedef Dislikes shows Dislikes relation between a User and a Tuit.
  * @property {Tuit} dislikedTuit: the tuit a user disliked.
  * @property {User} dislikedBy: the user disliked a tuit.
  */
 export default class Dislikes {
   dislikedTuit: Tuit | null = null
    private dislikedBy: User | null = null;
 };

