import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";
import getUser from "./getUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
import getUserAvatar from "./getUserAvatar";
import listUsers from "./listUsers";
import updateAvailability from "./updateAvailability";

const router = Router();

//? GET requests
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);
router.get("/listing/get", listUsers);

//? POST requests
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/availability", isLoggedIn, isProvider, updateAvailability);

export const userRouter = router;
