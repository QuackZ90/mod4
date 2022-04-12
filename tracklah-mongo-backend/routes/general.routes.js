const express = require('express');
const router = express.Router();

router.use("/", (req, res, next) => {
    console.log("You have called a general route.");
    next();
});

const UserController = require("../controller/user.controller")
const userController = new UserController();
router.post("/user", userController.register);

module.exports = router;