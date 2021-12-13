const express = require("express");
const { isAdmin } = require("../auth/authorize");
const { authenticate } = require("../auth/userAuth");
const { delUserController } = require("../controllers/del.user");
const { getUserProfileController } = require("../controllers/get.profile.user");
const { logOutUserController } = require("../controllers/patch.logout.user");
const { logInUserController } = require("../controllers/post.login.user");
const { registerUserController } = require("../controllers/post.register.user");
const { updateUserController } = require("../controllers/put.user");
const { logInValidator } = require("../validators/loginValidator");
const { registerValidator } = require("../validators/registerValidators");
const { ValidationChecker } = require("../validators/validatorChecker");
const router = express.Router();

// user route for CRUD
router.get("/profile", authenticate, getUserProfileController);
router.post("/login", logInValidator, ValidationChecker, logInUserController);
router.post(
	"/register",
	registerValidator,
	ValidationChecker,
	registerUserController,
);
router.post("/logout", authenticate, logOutUserController);
router.put("/edit/:userId", authenticate, isAdmin, updateUserController);
router.delete("/delete/:userId", authenticate, isAdmin, delUserController);

module.exports = router;
