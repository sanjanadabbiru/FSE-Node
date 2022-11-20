import User from "../models/User";

  import session from "express-session";

  export = session;

  declare module "express-session" {
    interface Session {
        profile:User;
    }
  }