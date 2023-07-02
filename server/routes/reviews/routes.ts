import { Router } from "express";
import { isLoggedIn, isNotBanned } from "../../middlewares";
import createReview from "./createReview";
import deleteReview from "./deleteReview";
//import getReview from "./listReview";
import listReviews from "./listReviews";
import updateReview from "./updateReview";

const router = Router();

//? GET requests
router.get("/:id", listReviews);

//? POST requests
router.post("/:id/create", isLoggedIn, isNotBanned, createReview);
router.post("/:id/update", isLoggedIn, isNotBanned, updateReview);

// ? DELETE requests
router.delete("/:id/delete", isLoggedIn, isNotBanned, deleteReview);

export const reviewsRouter = router;
