import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";
import createCollab from "./createCollab";
import deleteCollab from "./deleteCollab";
import getCollab from "./getCollab";
import listCollabs from "./listCollabs";
import listYourCollabs from "./listYourCollabs";
import respondCollab from "./respondCollab";
import updateCollab from "./updateCollab";

const router = Router();

//? POST requests
router.post("/create", isLoggedIn, isProvider, createCollab);
router.post("/:id/respond", isLoggedIn, isProvider, respondCollab);
router.post("/:id/update", isLoggedIn, isProvider, updateCollab);

//? GET requests
router.get("/listing", listCollabs);
router.get("/listing/yourCollabs", isLoggedIn, isProvider, listYourCollabs);
router.get("/:id", getCollab);

//? DELETE requests
router.delete("/delete/:id", isLoggedIn, isProvider, deleteCollab);

export const collabRouter = router;
