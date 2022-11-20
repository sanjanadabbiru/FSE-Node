
/**
 * @file Declares API for Tuit related data access object methods
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import User from "../models/User";
import Stats from "../models/Stats";

export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;

    findTuitsByUser(uid: string): Promise<Tuit[]>;

    findTuitById(tid: string): Promise<Tuit>;

    createTuit(uid: string, tuit: Tuit): Promise<Tuit>;

    deleteTuit(tid: string): Promise<any>;

    updateTuit(tid: string, tuit: Tuit): Promise<any>;

    updateLikes(tid: string, stats: Stats): Promise<any>;

}
