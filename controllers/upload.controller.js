const { Image } = require("../models/image.model");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const { Console } = require("console");

exports.uploadFile = async (req, res) => {
  const body = req.body;
  if (!body || req.files.length == 0) {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Vui lòng chọn tệp.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  if (req.files) {
    var ids = [];
    for (const file of req.files) {
      const image = await Image.create({
        name: body.name,
        type: body.type,
        path: file.path,
      });
      if (image) {
        ids.push(image._id);
      }
    }

    return res.status(200).json({
      success: true,
      result: ids,
      message: "Tải tệp thành công.",
      code: 200,
    });
  }
  return res.status(400).json({
    success: false,
    result: null,
    message: "Đã xảy ra lỗi.",
    code: 400,
    errorCode: "CREATE_FAILED",
  });
};

exports.deleteFile = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Vui lòng chọn tệp.",
      code: 400,
      errorCode: "DELETE_FAILED",
    });
  }
  const _id = req.params.id;
  if (!_id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Vui lòng chọn tệp.",
      code: 400,
      errorCode: "DELETE_FAILED",
    });
  }

  let image = await Image.findOne({ _id: ObjectId(_id) });
  console.log(image);
  if (image) {
    fs.unlink(image.path, function (err) {
      if (err) {
        console.log("unlink failed", err);
      } else {
        console.log("file deleted");
      }
    });
    const imageDeleted = await Image.deleteOne({ _id: ObjectId(_id) });
    return res.status(200).json({
      success: true,
      result: imageDeleted,
      message: "Xóa tệp thành công.",
      code: 200,
    });
  } else {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Tệp không hợp lệ.",
      code: 400,
      errorCode: "DELETE_FAILED",
    });
  }
};
