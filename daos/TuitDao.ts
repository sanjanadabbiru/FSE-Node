/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";
import Stats from "../models/Stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getTuit = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    /**
     * Uses TuitDao to retrieve all tuit documents from tuits collection.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitDao to retrieve all tuits documents from tuits collection that are created by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitDao to retrieve a tuit documents created by a user from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitDao to insert tuit instance into the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Uses TuitDao to update tuit instance in the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is updated into the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Removes a tuit instance from the database.
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});

    /**
   * update a tuit's stats
   * @param tid id ot the tuit
   * @param newStats new stats of the tuit
   * @returns
   */
     updateLikes = async (tid:string, newStats: Stats): Promise<any> =>
     TuitModel.updateOne(
         {_id: tid},
         {$set: {stats: newStats}});


   updateDislikes =
           async (tid: string, newStats: Stats) =>
               TuitModel.updateOne(
                   { _id: tid },
                   { $set: { stats: newStats } });
}