const { User } = require("../models/user.model");
const config = require("../configs/database");
const { ObjectId } = require("mongodb");

exports.signup = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Vui lòng nhập số điện thoại.",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  const { phone_number, auth_type } = body;
  const types = ["google", "phone", "apple"];
  if (!phone_number) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  if (!types.includes(auth_type)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  let userDB = await User.findOne({
    phone_number: { $eq: phone_number },
  });
  if (userDB) {
    res.status(400).send({
      success: false,
      data: null,
      message: "Số điện thoại đã tồn tại.",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  } else {
    const user = await User.create({
      phone_number: phone_number,
      auth_type: auth_type,
    });
    if (user != null) {
      return res.status(200).json({
        success: true,
        data: user,
        message: "Tạo tài khoản thành công.",
        code: 200,
      });
    } else {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Đã xảy ra lỗi.",
        code: 400,
        errorCode: "REGISTER_FAILED",
      });
    }
  }
};

exports.getProfile = async (req, res) => {
  const phone_number = req.params.phone_number;
  console.log(phone_number);
  let user = await User.findOne({
    phone_number: { $eq: phone_number },
  });
  console.log(user);
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Thành công.",
      data: user,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Đã xảy ra lỗi.",
      data: null,
    });
  }
};

exports.getUsers = async (req, res) => {
  let user = await User.find({
    phone_number: {$exists: true, $ne: ""}
  });
  return res.status(200).json({
    success: true,
    message: "Thành công.",
    data: user,
  })
};


exports.update = async (req, res) => {
  const { full_name, email, avatar } = req.body;
  const user_id = req.query.id;
  console.log(full_name);
  console.log(email);
  console.log(user_id);
  let user = await User.findOneAndUpdate(
    {
      _id: ObjectId(user_id),
    },
    { full_name: full_name, email: email,  }
  ).then((user) => {
    if (user) {
      res.status(200).json({
        success: true,
        message: "Thành công.",
        data: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Đã xảy ra lỗi.",
        data: null,
      })
    }
  });
};
