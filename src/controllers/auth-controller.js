const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const { invalid } = require("joi");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    //console.log(value);
    if (error) {
      error.statusCode = 400;
      return next(error);
    }
    const { email, phoneNumber } = value;

    const isExistUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: value.email }, { phoneNumber: value.phoneNumber }],
      },
    });

    if (isExistUser) {
      next("error");
    }

    const createdUser = await prisma.users.create({
      data: { ...value, password: await bcrypt.hash(value.password, 12) },
    });

    res.json(createdUser);
    // res.json("dsfgdthfghj");
    // console.log(value);
    // value.password = await bcrypt.hash(value.password, 12);
    // const users = await prisma.users.create({
    //   data: value,
    // });

    // const payload = { usersId: users.id };
    // const accessToken = jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET_KEY || "2gdfmglfdkmmfdgmdfgm",
    //   {
    //     expiresIn: process.env.JWT_EXPIRE,
    //   }
    // );
    // res.status(201).json({ accessToken });
    // console.log(value);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    console.log(value);
    if (error) {
      return next(error);
    }
    const users = await prisma.users.findFirst({
      // {username:'kuy'}, undefined
      where: {
        OR: [
          { email: value.emailOrPhoneNumber },
          { phoneNumber: value.emailOrPhoneNumber },
        ],
      },
    });
    if (!users) {
      return next(createError("invalid credential mai me user i kwai", 400));
    }
    const isMatch = await bcrypt.compare(value.password, users.password);
    if (!isMatch) {
      return next(createError("invalid credential password pid i hia", 400));
    }

    const payload = { usersId: users.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "2gdfmglfdkmmfdgmdfgm",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete users.password;
    res.status(201).json({ accessToken, users });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  res.status(200).json({ users: req.users });
};
