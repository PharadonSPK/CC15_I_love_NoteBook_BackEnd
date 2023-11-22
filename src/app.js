require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const rateLimitMiddleware = require("./middlewares/rate-limit");
const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const cartRoute = require("./routes/cart-route");

const app = express();

app.use(cors());
app.use(morgan("dev")); //combined=requestมาตอนกี่โมง,dev=requestโ
app.use(express.json());
app.use(express.static("public"));
// app.use(rateLimitMiddleware);
app.use(express.json());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
// https://www.youtube.com/watch?v=OXHEOBvOiWc&list=PL2pMBsI7XJjOir5w1Lx_dcmjlplFsu-pC&index=66 50:18
