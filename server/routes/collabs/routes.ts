import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";
import createCollab from "./createCollab";
import deleteCollab from "./deleteCollab";
import getCollab from "./getCollab";
import listCollabs from "./listCollabs";
import respondCollab from "./respondCollab";
import updateCollab from "./updateCollab";

const router = Router();

//? POST requests
router.post("/create", isLoggedIn, isProvider, createCollab);
router.post("/respond/:id", isLoggedIn, isProvider, respondCollab);
router.post("/update/:id", isLoggedIn, isProvider, updateCollab);

//? GET requests
router.get("/listing", listCollabs);
router.get("/:id", getCollab);

//? DELETE requests
router.delete("/delete/:id", isLoggedIn, isProvider, deleteCollab);

export const collabRouter = router;
