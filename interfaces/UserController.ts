
/**
 * @file Declares Controller for the Users resource
 */
import {Request, Response} from "express";

export default interface UserControllerI {
    findAllUsers(req: Request, res: Response): void;

    findUserById(req: Request, res: Response): void;

    createUser(req: Request, res: Response): void;

    deleteUser(req: Request, res: Response): void;

    deleteUsersByUsername(req: Request, res: Response): void;

    updateUser(req: Request, res: Response): void;

    findUsersByUsername(req: Request, res: Response): void;

}