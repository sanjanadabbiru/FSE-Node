/**
 * @file Declares API for Dislikes related data access object methods
 */
 import Dislikes from "../models/Dislikes";

 /**
  * @interface DislikesDao An interface for Dislikes access objects for Dislikes on Tuiter.
  *
  */
 export default interface DislikesDaoI {
     /**
      * Uses LikeModel to retrieve all Dislikes from Dislikes collection
      * @param {string} tid Tuit id for which Dislikes are to be retrieved
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
     findTuitsUserDisliked(uid: string): Promise<Dislikes[]>;

     /**
      * Uses LikeModel to retrieve all Dislikes from Dislikes collection
      * @param {string} uid Userids of users who Disliked the tuit
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
     findUsersThatDislikedTuit(tid: string): Promise<Dislikes[]>;

     /**
      * Uses DislikeModel to count Dislikes on a tuit.
      * @returns Promise To be notified with the Dislikes count.
      */
     findTuitDislikesCount(tid: string): void;

     /**
      * Uses DislikeModel to create a new like for tuit.
      * @param {string} uid User id of user who Dislikes the tuit
      * @param {string} tid Tuit id of tuit to be Disliked
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
     userDislikesTuit(tid: string, uid: string): Promise<Dislikes>;

     /**
      * Uses DislikeModel to remove a  like for tuit.
      * @param {string} uid User id of user who unDisliked the tuit
      * @param {string} tid Tuit id of tuit to be unDisliked
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
     userUndislikesTuit(tid: string, uid: string): Promise<any>;
  }