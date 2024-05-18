const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUpdateCurrentUser } = require("../middlewares/validation");

router.get("/me", auth, validateUpdateCurrentUser, getCurrentUser);

module.exports = router;
