import { Router } from "express";
import {userRoutes} from "./user.routes";
import {sessionRoutes} from "./session.routes";
import { postRoutes } from "./post.routes";

const router = Router();
router.use("/users",userRoutes);
router.use("/session",sessionRoutes);
router.use("/post",postRoutes);

export{router}