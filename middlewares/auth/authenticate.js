const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
  const authenticateHeader = req.header("Authorization");
  //token lấy từ header về sẽ có dạng
  //Bearer [token] vì vậy mình phải cắt chuỗi ra
  const token = authenticateHeader? authenticateHeader.split(" ")[1]: "";

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decode) {
      req.user = decode;
      console.log("decode",decode);
      next();
    } else res.status(401).send("You don't login");
  } catch (error) {
    res.status(401).send("You don't login");
  }
};

module.exports = { authenticate };
