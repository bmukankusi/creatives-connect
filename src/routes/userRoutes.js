

const express = require("express");
const {
    userHome,
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    uploadProfilePicture,
    upload,
    uploadWork,
    createWork,
    getUserWorks
} = require("../controllers/userController");
const isLoged = require("../middleware/isLoged");

const userRoutes = express.Router();

userRoutes.get("/", userHome);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", isLoged, userProfile);
userRoutes.put("/profile/update", isLoged, updateProfile);
userRoutes.post("/profile/picture", isLoged, upload.single('profilePicture'), uploadProfilePicture);

userRoutes.post("/createWork", isLoged, uploadWork.single("workImage"), createWork)
userRoutes.get("/works", isLoged, getUserWorks)

module.exports = userRoutes;

