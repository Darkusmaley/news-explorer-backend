const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const NotFoundError = require("../utils/errors/NotFoundError");

const { login, createUser } = require("../controllers/users");
const {
  validateUserLogin,
  validateUserCreation,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserCreation, createUser);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
