const { Product, Agency, User, Category } = require("../models/index");

const getAllPoduct = async (req, res) => {
  try {
    const listProduct = await Product.findAll({
      include: [
        { model: Agency, attributes: ["agency_name", "address"] },
        { model: User, as: "employee", attributes: ["user_name", "avatar","phone_number","email"] },
        { model: Category,attributes: ["category_name"]},
      ],
    });
    res.status(200).send(listProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailPoduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: Agency, attributes: ["agency_name", "address"] },
        { model: User, as: "employee", attributes: ["user_name", "avatar","phone_number","email"] },
        { model: Category,attributes: ["category_name"]},
      ],
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createProduct = async (req, res) => {
  const { file } = req;

  const dataContent = JSON.parse(req.body.data);

  const urlImage = `http://localhost:8000/${file.path}`;

  try {
    const newProduct = await Product.create({
      ...dataContent,
      image: urlImage,
    });
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.destroy({ where: { id } });

    res.status(200).send("Delete product successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { file } = req;

  const urlImage = file ? `http://localhost:8000/${file.path}` : "";

  const dataContent = JSON.parse(req.body.data);

  const productEdit = urlImage
    ? {
        ...dataContent,
        image: urlImage,
      }
    : dataContent;

  try {
    await Product.update(
      {
        ...productEdit,
      },
      {
        where: { id },
      }
    );
    const productUpdated = await Product.findOne({ where: { id } });
    res.status(200).send(productUpdated);

    // res.status(201).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllPoduct,
  getDetailPoduct,
  createProduct,
  updateProduct,
};
