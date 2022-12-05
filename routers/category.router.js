const express = require("express");
const { getAllCategories, createCategory, deleteCategory } = require("../controllers/category.controller");
const {authenticate} = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");



const categoryRouter = express.Router();


categoryRouter.get("/",getAllCategories );
categoryRouter.post("/",authenticate, createCategory);
categoryRouter.delete("/:id",authenticate,deleteCategory);


module.exports = categoryRouter;
