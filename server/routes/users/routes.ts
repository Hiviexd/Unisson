import { Router } from "express";
import getUser from "./getUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
import getUserAvatar from "./getUserAvatar";

const router = Router();

//? GET requests
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);

//? POST requests
router.post("/register", registerUser);
router.post("/login", authenticateUser);

export const userRouter = router;
