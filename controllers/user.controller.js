const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models/index");

dotenv.config();

const register = async (req, res ) => {
  const { password, email } = req.body;
  try {
    //mã hóa pass
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const avatarUrl = gravatar.url(email);
    const data = { ...req.body, avatar: avatarUrl, password: hashPassword };

    const newUser = await User.create(data);
   
     res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { id, user_name, email, type } = req.user;
    const payload = {
      id,
      user_name,
      email,
      type,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      // expiresIn: "20s",
    });

    res.status(201).send({
      message: "Login successfully",
      accessToken,
      content: payload
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const uploadAvatar = async (req, res) => {
  const { user, file } = req;
  
  // const urlImage = `http://localhost:8000/${file.path}`;
  

  const urlImage = `https://blockchain-api-ab1c.onrender.com/${file.path}`;

  const userFind = await User.findOne({
    where: { id: user.id },
  });

  userFind.avatar = urlImage;

  await userFind.save();

  res.send(userFind);
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { user_name, email, phone_number, address } = req.body;

  try {
    await User.update(
      { user_name, email, phone_number, address },
      {
        where: { id },
      }
    );

   
    const profileUpdated = await User.findOne({ where: { id },  });
    res.status(200).send(profileUpdated);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getAllUser = async (req, res) => {
  try {
    const listUser = await User.findAll()
    res.status(201).send(listUser)
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { register, login, uploadAvatar, editProfile,getAllUser };
