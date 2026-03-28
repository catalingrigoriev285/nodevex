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

const updatePost = async (req, res) => {
    try {
        const { id, title, content } = req.body;

        // validations
        if (!title && !content) {
            return res
                .status(400)
                .json({
                    error: "At least one of title or content is required",
                });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { new: true },
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        console.error("Error updating post:", error, error.stack);
        res.status(500).json({
            error: "Failed to update post",
            details: error.message,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Post ID is required" });
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({
            message: "Post deleted successfully",
            post: deletedPost,
        });
    } catch (error) {
        console.error("Error deleting post:", error, error.stack);
        res.status(500).json({
            error: "Failed to delete post",
            details: error.message,
        });
    }
};


export { createPost, getPosts, updatePost, deletePost };
