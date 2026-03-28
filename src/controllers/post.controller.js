import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // validations
        if (!title || !content || !author) {
            return res
                .status(400)
                .json({ error: "Title, content, and author are required" });
        }

        // create and save new post
        const newPost = new Post({
            title,
            content,
            author,
        });

        const savedPost = await newPost.save();
        res.status(201).json({
            message: "Post created successfully",
            post: savedPost,
        });
    } catch (error) {
        console.error("Error creating post:", error, error.stack);
        res.status(500).json({
            error: "Failed to create post",
            details: error.message,
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username");
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error, error.stack);
        res.status(500).json({
            error: "Failed to fetch posts",
            details: error.message,
        });
    }
};

export { createPost, getPosts };
