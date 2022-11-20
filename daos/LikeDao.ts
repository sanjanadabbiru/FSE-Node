/**
 * @file Implements DAO managing data storage of Likes resource.
 * Uses mongoose LikeModel to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getLike = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }


    /**
     * Uses LikeDao to retrieve all user documents from users collection that liked a Tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();


       findUserLikesTuit = async (uid: string, tid:string) =>
       LikeModel.findOne(
         {tuit: tid, likedBy: uid});

    /**
     * Uses LikeDao to retrieve all tuit documents from tuits collection that are liked by a User
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
            })
            .exec();

    countHowManyLikedTuit = async (tid: string) : Promise<any> =>
        LikeModel.countDocuments({tuit: tid});

    /**
     * Uses LikeDao to insert like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes like instance from the database.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}

