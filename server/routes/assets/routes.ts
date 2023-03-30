import { Router } from "express";
import getAvatar from "./getAvatar";

const router = Router();

//? GET requests
router.get("/avatar/:id", getAvatar);

export const assetsRouter = router;
