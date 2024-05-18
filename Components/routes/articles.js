const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getArticle,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateItemCreation,
  validateUserID,
} = require("../middlewares/validation");

router.get("/", getArticle);
router.post("/", auth, validateItemCreation, createArticle);
router.delete("/:articleId", auth, validateUserID, deleteArticle);

module.exports = router;
