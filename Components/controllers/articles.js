const Article = require("../models/article");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");

module.exports.getArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((items) => res.send(items))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Bad request"));
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { userId } = req.user._id;

  Article.findById(articleId)
    .orFail()
    .then((article) => {
      if (!article.owner.equals(userId)) {
        return next(new ForbiddenError("Forbidden request"));
      }
      return Article.findByIdAndRemove(req.params.articleId).then((user) => {
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Cannot find article with that Id"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Bad request"));
      }
      if (err.name === "Incorrect article owner") {
        return next(new ForbiddenError("Forbidden request"));
      }
      return next(err);
    });
};
