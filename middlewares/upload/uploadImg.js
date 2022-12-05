const multer = require("multer");
const mkdirp = require("mkdirp");

const uploadImage = (type) => {
  const pathImg = `./public/images/${type}`;

  //tự tạo folder lưu file theo đường dẫn trên
  const made = mkdirp.sync(pathImg);
  //upload file
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathImg); //setup chỗ cần lưu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); //đặt lại tên cho file
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImgFile = [".jpg", ".png",".jpeg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImgFile.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("extension is not correct"));
      }
    },
  });

  return upload.single(`${type}`);
};

module.exports = { uploadImage };