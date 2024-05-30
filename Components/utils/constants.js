const UnauthorizedError = require("./errors/UnauthorizedError");

const VALID_EMAIL = "Enter a valid email";
const ARTICLE_NOT_FOUND = "Article is not found";
const INVALID_OWNER = "Invalid owner";
const INVALID_CREDENTIALS = "Credentials do not match";
const UNAUTHORIZED = "Not authorized";
const BAD_REQUEST = "Bad request";
const EMAIL_IN_USE = "Email already in use";
const USER_NOT_FOUND = " No matching users";
const CREATE_USER_ISSUE = "Error creating user";

module.exports = {
  VALID_EMAIL,
  ARTICLE_NOT_FOUND,
  BAD_REQUEST,
  INVALID_OWNER,
  EMAIL_IN_USE,
  USER_NOT_FOUND,
  CREATE_USER_ISSUE,
  INVALID_CREDENTIALS,
  UNAUTHORIZED,
};
