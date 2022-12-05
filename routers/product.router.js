const express = require("express");
const { getAllPoduct, getDetailPoduct, createProduct ,deleteProduct,updateProduct} = require("../controllers/product.controller");
const {authenticate} = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { uploadImage } = require("../middlewares/upload/uploadImg");



const productRouter = express.Router();


productRouter.get("/", getAllPoduct);
productRouter.get("/:id",getDetailPoduct );
productRouter.post("/",authenticate,createProduct );
productRouter.put("/:id",authenticate,updateProduct);


module.exports = productRouter;
