/**
 * @file Implements DAO managing data storage of Dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
 import Dislikes from "../models/Dislikes";
 import DislikesModel from "../mongoose/DislikesModel";
 import DislikesDaoI from "../interfaces/DislikesDao";
 import User from "../models/User";
 import TuitModel from "../mongoose/TuitModel";
 import  Stats  from "../models/Stats";

 /**
  * @class DislikeDao Implements Data Access Object managing data storage
  * of Dislikes
  * @property {DislikeDao} DislikeDao Private single instance of DislikeDao
  */
 export default class DislikesDao implements DislikesDaoI {

     private static DislikesDao: DislikesDao | null = null;
     public static getDislike = (): DislikesDao => {
         if(DislikesDao.DislikesDao === null) {
             DislikesDao.DislikesDao = new DislikesDao();
         }
         return DislikesDao.DislikesDao;
     }

      /**
    * Uses DislikeModel to retrieve all Disliked tuits by a user from Dislikes collection
    * @param {string} uid User id for which Dislikes are to be retrieved
    * @returns Promise To be notified when the Dislikes are retrieved from
    * database
    */
     findTuitsUserDisliked = async (uid: string): Promise<Dislikes[]> =>

        DislikesModel
        .find({dislikedBy: uid})
        .populate({
        path: "dislikedTuit",
        populate: {
            path: "postedBy"
        }
        })
        .exec();

     /**
    * Uses DislikeModel to retrieve all Dislikes from Dislikes collection
    * @param {string} tid Tuit id of tuit who Dislikes the tuit
    * @returns Promise To be notified when the Dislikes are retrieved from
    * database
    */
     findUsersThatDislikedTuit = async (tid: string): Promise<Dislikes[]> =>
         DislikesModel
             .find({dislikedTuit: tid})
             .populate("dislikedBy")
             .exec();

     /**
    * Uses DislikeModel to create a new Dislike for tuit.
    * @param {string} uid User id of user who Dislikes the tuit
    * @param {string} tid Tuit id of tuit to be Disliked
    * @returns Promise To be notified when the Dislikes are retrieved from
    * database
    */
    //  userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
    //      DislikesModel.create({dislikedTuit: tid, dislikedBy: uid});
    //  }


       userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikesModel.create({dislikedTuit: tid, dislikedBy: uid});



     /**
    * Uses DislikeModel to remove a  Dislike for tuit.
    * @param {string} uid User id of user who unDislikes the tuit
    * @param {string} tid Tuit id of tuit to be unDisliked
    * @returns Promise To be notified when the Dislikes are deleted from
    * database
    */
     userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
     DislikesModel.deleteOne({dislikedTuit: tid, dislikedBy: uid});

 /**
    * Uses DislikeModel to count number of Dislikes a tuit has.
    * @param {string} tid Tuit id of tuit to be unDisliked
    * @returns Promise To be notified with the total Dislikes on specific tuit.
    */
     findTuitDislikesCount = async (tid: string): Promise<any> =>
     DislikesModel.countDocuments({dislikedTuit: tid});

     findUserDislikesTuit = async (uid: string, tid:string) =>
     DislikesModel.findOne(
       {dislikedTuit: tid, dislikedBy: uid});


    findAllTuitsDislikedByUser = async (uid: string) =>
    DislikesModel
        .find({dislikedBy: uid})
        .populate({
        path: "dislikedTuit",
        populate: {
            path: "postedBy"
        }
        })
        .exec();


 }