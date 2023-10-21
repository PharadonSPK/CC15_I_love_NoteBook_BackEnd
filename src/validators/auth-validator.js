const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  emailOrPhoneNumber: Joi.alternatives([
    Joi.string().email(),
    Joi.string().pattern(/^[0-9]{10}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  phoneNumber: Joi.forbidden().when("emailOrPhoneNumber", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrPhoneNumber")),
  }),
  email: Joi.forbidden().when("emailOrPhoneNumber", {
    is: Joi.string().email(),
    then: Joi.string().default(Joi.ref("emailOrPhoneNumber")),
  }),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  emailOrPhoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

exports.loginSchema = loginSchema;

// exports.validateRegister = input => {
//     const { value,error } = registerSchema.validate(input);
//     if (error) {

//     }
// }

// exports.validate = input => {
//     const { value,error } = loginSchema.validate(input);
//     if (error) {

//     }
// }
