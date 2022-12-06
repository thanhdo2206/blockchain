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

const editCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );
    const categoryUpdated = await Category.findOne({ where: { id } });
    res.status(200).send(categoryUpdated);

    // res.status(201).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
};
