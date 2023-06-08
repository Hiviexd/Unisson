import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";
import multer from "multer";

import getUser from "./getUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
import getUserAvatar from "./getUserAvatar";
import listUsers from "./listUsers";
import updateAvailability from "./updateAvailability";
import updateUser from "./updateUser";

const router = Router();

//? POST requests
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/availability", isLoggedIn, isProvider, updateAvailability);
router.post(
    "/update",
    multer({ storage: multer.memoryStorage() }).single("image"),
    isLoggedIn,
    updateUser
);

//? GET requests
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);
router.get("/listing/get", listUsers);

export const userRouter = router;
