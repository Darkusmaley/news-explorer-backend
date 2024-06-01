const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateItemCreation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field must be filled in',
    }),
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.url": ' The "link" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.url": ' The "image" field must be filled in',
    }),
  }),
});

module.exports.validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "email" field is 2',
      "string.max": 'The maximum length of the "email" field is 30',
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "email" field is 2',
      "string.max": 'The maximum length of the "email" field is 30',
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserID = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string-hex": "ID must be hexadecimal string",
      "string-lenght": "ID must be 24 characters in length",
    }),
  }),
});
