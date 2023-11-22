const prisma = require("../models/prisma");

exports.addToCart = async (req, res, next) => {
  try {
    console.log(req.body.productId);
    const product = await prisma.products.findFirst({
      where: {
        id: req.body.productId,
      },
    });

    const total = +req.body.quantity * product.price;

    const cart = await prisma.cart.create({
      data: {
        quantity: String(req.body.quantity),
        total: String(total),
        usersId: req.users.id,
        productsId: product.id,
      },
    });

    // const showCart = await prisma.cart.findmany({
    //   inculde: {
    //     cart: req.cart.id,
    //   },
    // });

    res.status(201).json({ cart });
  } catch (error) {
    next(error);
  }
};

exports.getToCart = async (req, res, next) => {
  try {
    const { id } = req.users;

    const cart = await prisma.cart.findMany({
      where: {
        usersId: id,
      },
      include: { Products: true },
    });

    res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
  }
};
