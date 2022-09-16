const { AdvanceSalary } = require("../models/advancesalary.model");
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
  const advancesalary = await AdvanceSalary.create({
    salary: body.salary,
    type: body.type,
    salary: body.salary,
    note: body.note,
    jobId: body.jobId,
    userId: body.userId,
  });
  if (advancesalary != null) {
    return res.status(200).json({
      success: true,
      data: advancesalary,
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
  let advancesalary = await AdvanceSalary.findOneAndUpdate(
    {
      _id: ObjectId(body.id),
    },
    {
      dateTime: body.dateTime,
      salary: body.salary,
      note: body.note,
    },
    { new: true }
  );
  if (advancesalary != null) {
    return res.status(200).json({
      success: true,
      data: advancesalary,
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
  let results = await AdvanceSalary.find({
  });
  if (results) {
    return res.status(200).json({
      success: true,
      message: "Thành công.",
      data: results,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Đã xảy ra lỗi.",
      data: null,
    });
  }
};