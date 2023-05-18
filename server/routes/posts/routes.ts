import { Router } from "express";
import multer from "multer";
import { isLoggedIn } from "../../middlewares";
import createPost from "./createPost";
import deletePost from "./deletePost";
import getPost from "./getPost";
import listPosts from "./listPosts";
import getPostImage from "./getPostImage";

const router = Router();


//? GET requests
router.get("/listing", listPosts);
router.get("/:id", getPost);
router.get("/:id/:imageid", getPostImage);

//? POST requests
router.post(
	"/new",
	isLoggedIn,
	multer({ storage: multer.memoryStorage() }).array("files"),
	createPost
);

// ? DELETE requests
router.delete("/:id/delete", isLoggedIn, deletePost);

export const postRouter = router;
