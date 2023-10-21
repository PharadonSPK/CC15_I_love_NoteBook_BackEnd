const authenticateMiddleware = require("../middlewares/authenticate");

const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/all", authenticateMiddleware, productController.getAllProduct);
//ตรวจยูสเซอร์ล็อกอินหรือยัง authenticateMiddleware ขอข้อมูล

module.exports = router;
