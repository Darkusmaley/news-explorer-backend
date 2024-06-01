const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const { MONGO_DB_CONNECTION = "mongodb://127.0.0.1:27017/news-explorer_db" } =
  process.env;

const generateToken = (user) => {
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === "production" ? JWT_SECRET : "Secret_Key_Here",
    { expiresIn: "7d" },
  );

  return token;
};

module.exports = { NODE_ENV, JWT_SECRET, generateToken, MONGO_DB_CONNECTION };
