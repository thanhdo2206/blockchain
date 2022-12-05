const { Category } = require("../models/index");

const getAllCategories = async (req, res) => {
  try {
    const listCategories = await Category.findAll();
    res.status(200).send(listCategories);
  } catch (error) {
    res.status(500).send(error);
  }
};


const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({ category_name });
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const categoryDelete = await Category.destroy({ where: { id } });
  
      res.status(200).send("Delete category successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };

module.exports = { getAllCategories, createCategory, deleteCategory };
