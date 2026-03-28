import express from 'express';

const app = express();
app.use(express.json());

// routes imports
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

// routes declaration
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;