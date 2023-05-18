import { Router } from "express";
import { isLoggedIn } from "../../middlewares";
import createReview from "./createReview";
//import deleteReview from "./deleteReview";
//import getReview from "./listReview";
//import listReviews from "./listReviews";
//import updateReview from "./updateReview";

const router = Router();

//? GET requests
//router.get("/reviews", listReviews);
//router.get("/reviews/:id", getReview);


//? POST requests
router.post("/new", isLoggedIn, createReview);
//router.post("/reviews/:id/update", isLoggedIn, updateReview);

// ? DELETE requests
//router.delete("/reviews/:id/delete", isLoggedIn, deleteReview);

export const reviewsRouter = router;
