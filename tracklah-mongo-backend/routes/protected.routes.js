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
router.post("/user", jwtauthenticate.canEditUser, userController.register);
router.delete("/user", jwtauthenticate.canEditUser, userController.deleteUser);
router.post("/items", userController.addItem);
router.delete("/items", userController.deleteItem);
router.get("/items", userController.showAllItems);

module.exports = router;