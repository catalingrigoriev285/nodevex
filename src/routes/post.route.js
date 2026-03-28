import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", createPost);
router.get("/get", getPosts);
router.put("/update", updatePost);
router.delete("/delete", deletePost);

export default router;