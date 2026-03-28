import express from 'express';

const app = express();
app.use(express.json());

// routes imports
import userRoutes from "./routes/user.route.js";

// routes declaration
app.use("/api/users", userRoutes);

export default app;