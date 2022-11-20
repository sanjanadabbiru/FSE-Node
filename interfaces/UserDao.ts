/**
 * @file Declares API for Users related data access object methods
 */
import User from "../models/User";

export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;

    findUserById(uid: string): Promise<any>;

    createUser(user: User): Promise<User>;

    findUsersByUsername(username: string): Promise<any>;

    deleteUser(uid: string): Promise<any>;

    deleteUsersByUsername(username: string): Promise<any>;

    updateUser(uid: string, user: User): Promise<any>;

}

