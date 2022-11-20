/**
 * @file Declares Controller for the Follows resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userUnfollowsUser(req: Request, res: Response): void;

    findAllUsersThatFollowUser(req: Request, res: Response): void;

    allFollowersUnfollowUser(req: Request, res: Response): void;

    findAllUsersFollowedByUser(req: Request, res: Response): void;

    userFollowsUser(req: Request, res: Response): void;

    userUnfollowsAllUsers(req: Request, res: Response): void;
};