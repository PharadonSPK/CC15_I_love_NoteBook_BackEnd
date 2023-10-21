const prisma = require("../models/prisma");

exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.products.findMany();
    res.status(201).json(allProduct);
  } catch (error) {
    console.log(error);
  }
};
