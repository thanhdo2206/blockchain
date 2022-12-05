const express = require("express");
const agencyRouter = require("./agency.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");

const userRouter = require("./user.router");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/agency", agencyRouter);
rootRouter.use("/product",productRouter);




module.exports = rootRouter;
