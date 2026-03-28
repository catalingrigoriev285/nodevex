import dotenv from "dotenv";

import app from "./app.js";
import connectToDatabase from "./config/database.js";

dotenv.config({
    path: "./.env",
});

const startServer = async () => {
    try {
        await connectToDatabase();

        app.on("error", (error) => {
            console.error(`Server error: ${error.message}`);
            throw error;
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();