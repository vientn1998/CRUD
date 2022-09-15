const { TimekeepingType } = require("../models/timekeepingtype.model");
const { ObjectId } = require("mongodb");

exports.create = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Vui lòng nhập dữ liệu.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  const types = ["hour", "day", "wifi"];
  if (!types.includes(body.type)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Phương thức không hợp lệ",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  const timekeepingtype = await TimekeepingType.create({
    name: body.name,
    type: body.type,
    salary: body.salary,
    jobId: body.jobId,
    userId: body.userId,
    note: body.note,
  });
  if (timekeepingtype != null) {
    return res.status(200).json({
      success: true,
      data: timekeepingtype,
      message: "Tạo thành công.",
      code: 200,
    });
  } else {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
};

exports.update = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Vui lòng nhập dữ liệu.",
      code: 400,
      errorCode: "UPDATE_FAILED",
    });
  }
  let timekeepingtype = await TimekeepingType.findOneAndUpdate(
    {
      _id: ObjectId(body.id),
    },
    {
      name: body.name,
      type: body.type,
      salary: body.salary,
      jobId: body.jobId,
      userId: body.userId,
      note: body.note,
    },
    { new: true }
  );
  if (timekeepingtype != null) {
    return res.status(200).json({
      success: true,
      data: timekeepingtype,
      message: "Cập nhật thành công.",
      code: 200,
    });
  } else {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi.",
      code: 400,
      errorCode: "UPDATE_FAILED",
    });
  }
};


exports.getAll = async (req, res) => {
  let types = await TimekeepingType.find({
  });
  if (types) {
    return res.status(200).json({
      success: true,
      message: "Thành công.",
      data: types,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Đã xảy ra lỗi.",
      data: null,
    });
  }
};