const express = require('express');
const router = express.Router();
const jwtauthenticate = require("../middleware/jwtauthenticate");

router.use("/", (req, res, next) => {
    console.log("You have called a protected route.");
    next();
});

router.use(jwtauthenticate.isLoggedIn); // calling jwt verification for everyone.

const UserController = require("../controller/user.controller")
const userController = new UserController();
router.delete("/user", jwtauthenticate.canEditUser, userController.deleteUser);

module.exports = router;