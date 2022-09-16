const { Job } = require("../models/job.model");
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
  const job = await Job.create({
    name: body.name,
    type: body.type,
    members: body.members,
    timekeepingTypes: body.timekeepingTypes,
    note: body.note,
  });
  if (job != null) {
    return res.status(200).json({
      success: true,
      data: job,
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
  let job = await Job.findOneAndUpdate(
    {
      _id: ObjectId(body.id),
    },
    {
      name: body.name,
      jobType: body.jobType,
      members: body.members,
      timekeepingTypes: body.timekeepingTypes,
      note: body.note,
    },
    { new: true }
  );
  if (job != null) {
    return res.status(200).json({
      success: true,
      data: job,
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
  let results = await Job.find({})
    .populate("members")
    .populate("timekeepingTypes");
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
