import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";

import createContract from "./createContract";
import listContracts from "./listContracts";
import getContract from "./getContract";
import respondContract from "./respondContract";

const router = Router();

//? POST requests
router.post("/create", isLoggedIn, createContract);
router.post("/:id/respond", isLoggedIn, isProvider, respondContract);

//? GET requests
router.get("/listing", isLoggedIn, listContracts);
router.get("/:id", isLoggedIn, getContract);

export const contractsRouter = router;
