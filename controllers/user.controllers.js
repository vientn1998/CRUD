const { User } = require("../models/user.model");
const { Device } = require("../models/device.model");
const config = require("../configs/database");
const { ObjectId } = require("mongodb");
const { Schema } = require("mongoose");

exports.signUpPhone = async (req, res) => {
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

exports.signUpDeviceId = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Vui lòng nhập thông tin.",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  const { deviceId, deviceName, deviceVersion, platform, authType } = body;
  const types = ["google", "phone", "apple", "deviceId"];
  if ("deviceId" != authType) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Phương thức không hợp lệ",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  if (!deviceId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Mã thiết bị không hợp lệ.",
      code: 400,
      errorCode: "REGISTER_FAILED",
    });
  }
  let deviceDB = await Device.findOne({
    deviceId: deviceId,
  });
  console.log("deviceDB: " + deviceDB);
  if (deviceDB) {
    const userDB = await User.findOne({
      devices: ObjectId(deviceDB._id),
    }).populate("devices");
    res.status(200).send({
      success: true,
      data: userDB,
      message: "Mã thiết bị đã tồn tại.",
      code: 200,
      errorCode: "ACCOUNT_EXISTS",
    });
  } else {
    const _objectId = new ObjectId();
    var user = await User.create({
      devices: [_objectId],
      authType: authType,
    });
    if (user != null) {
      const device = await Device.create({
        _id: _objectId,
        userId: user._id,
        deviceId: deviceId,
        deviceName: deviceName,
        deviceVersion: deviceVersion,
        platform: platform
      });
      const userNew = await (await User.findById(user._id)).populate("devices");
      return res.status(200).json({
        success: true,
        data: userNew,
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
  }).populate("devices");
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


exports.getProfileById = async (req, res) => {
  const userId = req.params.userId;
  let user = await User.findOne({
    _id: { $eq: userId },
  }).populate("devices");
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
    $or: [
      {
        phoneNumber: { $exists: true, $ne: "" },
      },
      {
        devices: { $exists: true, $ne: [] },
      },
    ]
  }).populate("devices");
  return res.status(200).json({
    success: true,
    message: "Thành công.",
    data: user,
  });
};

exports.getDevices = async (req, res) => {
  let devices = await Device.find({
    userId: { $eq: req.query.userId },
  });
  return res.status(200).json({
    success: true,
    message: "Thành công.",
    data: devices,
  });
};

exports.update = async (req, res) => {
  const { fullName, email, avatar } = req.body;
  const userId = req.params.id;
  let user = await User.findOneAndUpdate(
    {
      _id: ObjectId(userId),
    },
    { fullName: fullName, email: email, avatar: avatar },
    { new: true }
  );
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công.",
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
