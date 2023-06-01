import { Router } from "express";
import { isLoggedIn } from "../../middlewares";
import createReview from "./createReview";
import deleteReview from "./deleteReview";
//import getReview from "./listReview";
import listReviews from "./listReviews";
import updateReview from "./updateReview";

const router = Router();

//? GET requests
router.get("/:id", listReviews);

//? POST requests
router.post("/:id/new", isLoggedIn, createReview);
router.post("/:id/update", isLoggedIn, updateReview);

// ? DELETE requests
router.delete("/:id/delete", isLoggedIn, deleteReview);

export const reviewsRouter = router;
