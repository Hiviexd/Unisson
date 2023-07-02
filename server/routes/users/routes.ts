import { Router } from "express";
import { isLoggedIn, isProvider, isNotBanned, isAdmin } from "../../middlewares";
import multer from "multer";

import getUser from "./getUser";
import getUserByEmail from "./getUserByEmail";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
import getUserAvatar from "./getUserAvatar";
import listUsers from "./listUsers";
import listAllUsers from "./listAllUsers";
import updateAvailability from "./updateAvailability";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const router = Router();

//? POST requests
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/availability", isLoggedIn, isProvider, updateAvailability);
router.post(
    "/update",
    multer({ storage: multer.memoryStorage() }).single("image"),
    isLoggedIn,
    isNotBanned,
    updateUser
);

//? DELETE requests
router.delete("/delete", isLoggedIn, deleteUser);

//? GET requests
router.get("/email/:email", getUserByEmail); // TODO: reword this route to specify that it only fetches providers
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);
router.get("/listing/get", listUsers);
router.get("/listing/get/all", isLoggedIn, isAdmin, listAllUsers);

export const userRouter = router;
