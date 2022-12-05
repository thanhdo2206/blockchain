const bcrypt = require("bcryptjs");
const { User } = require("../../models/index");

const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;

    const dataFind = await Model.findOne({
      where: { id },
    });

    if (dataFind) {
      next();
    } else res.status(404).send("Not found !");
  };
};


const  checkSameUserName = async (req, res, next) => {
  const { user_name } = req.body;

  const dataFind = await User.findOne({
    where: { user_name },
  });

  if (dataFind) {
    res.status(404).send("Username already exists !");
  } else next();
}

const checkExistByUserName = async (req, res, next) => {
  const { user_name, password } = req.body;

  const dataFind = await User.findOne({
    where: { user_name },
  });

  if (dataFind) {
    req.user = dataFind;
    next();
  } else res.status(404).send("User name or password not valid !");
};



const checkPassword = (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  const isAuth = bcrypt.compareSync(password, user.password);

  if (isAuth) {
    next();
  } else res.status(201).send("User name or password not valid !");
};

module.exports = { checkExistByUserName, checkPassword,checkExist,checkSameUserName };
