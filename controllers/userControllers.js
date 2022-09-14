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
  const { phoneNumber, authType } = body;
  const types = ["google", "phone", "apple"];
  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Số điện thoại không hợp lệ",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  if (!types.includes(authType)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Phương thức không hợp lệ",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  let userDB = await User.findOne({
    phoneNumber: { $eq: phoneNumber },
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
      phoneNumber: phoneNumber,
      authType: authType,
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
  const phoneNumber = req.params.phoneNumber;
  let user = await User.findOne({
    phoneNumber: { $eq: phoneNumber },
  });
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
    phoneNumber: {$exists: true, $ne: ""}
  });
  return res.status(200).json({
    success: true,
    message: "Thành công.",
    data: user,
  })
};


exports.update = async (req, res) => {
  const { fullName, email, avatar } = req.body;
  const userId = req.params.id;
  let user = await User.findOneAndUpdate(
    {
      _id: ObjectId(userId),
    },
    { fullName: fullName, email: email, avatar: avatar  }, {new: true}
  );
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
    })
  }
};
