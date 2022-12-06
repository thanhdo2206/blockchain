const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models/index");

dotenv.config();

const register = async (req, res ) => {
  const { password, email ,user_name} = req.body;
  try {
    //mã hóa pass
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // gravatar.url(email);

    const avatarUrl = `https://avatars.dicebear.com/api/micah/${user_name}.svg`
    const data = { ...req.body, avatar: avatarUrl, password: hashPassword };

    const newUser = await User.create(data);
   
     res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { id, user_name, email, type,avatar } = req.user;
    const payload = {
      id,
      user_name,
      email,
      avatar,
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
  // const { user_name, email, phone_number, address } = req.body;

  try {
    await User.update(
      { ...req.body },
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
    res.status(500).send(error.message);
  }
}

const getInforUser = async (req, res) => {
  const {id} = req.user;
  try {
    const user = await User.findOne({where: { id }});
    
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error.message);
    
  }
}
module.exports = { register, login, uploadAvatar, editProfile,getAllUser,getInforUser };
