import { Router } from "express";
import getUser from "./getUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";

const router = Router();

//? GET requests
router.get("/:id", getUser);

//? POST requests
router.post("/register", registerUser);
router.post("/login", authenticateUser);

export const userRouter = router;
