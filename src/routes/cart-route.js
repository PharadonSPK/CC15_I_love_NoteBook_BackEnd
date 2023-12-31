const authenticateMiddleware = require("../middlewares/authenticate");
const cartController = require("../controllers/cart-controller");

const express = require("express");

const router = express.Router();

router.post("/", authenticateMiddleware, cartController.addToCart);
router.get("/getcart", authenticateMiddleware, cartController.getToCart);
//ตรวจยูสเซอร์ล็อกอินหรือยัง authenticateMiddleware ขอข้อมูล

module.exports = router;
