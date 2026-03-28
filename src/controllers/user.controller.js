import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // validations
        if (!email || !username || !password) {
            return res
                .status(400)
                .json({ error: "Email, username, and password are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already in use" });
        }

        // create and save new user
        const newUser = new User({
            email,
            username,
            password,
            loggedIn: false,
        });
        console.log("Creating user - saving to DB:", { email, username });
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser && savedUser._id);

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error, error.stack);
        res.status(500).json({
            error: "Failed to create user",
            details: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validations
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required" });
        }

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // update loggedIn status
        user.loggedIn = true;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error, error.stack);
        res.status(500).json({
            error: "Failed to log in user",
            details: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.loggedIn = false;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(`Error logging out user: ${error.message}`);
        res.status(500).json({
            error: "Failed to log out user",
            details: error.message,
        });
    }
};

export { createUser, loginUser, logoutUser };
