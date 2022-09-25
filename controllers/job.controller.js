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
  var _params = null;
  if (body.endTime) {
    _params = {
      name: body.name,
      jobType: body.jobType,
      ownerId: body.ownerId,
      members: body.members,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      reminderTime: new Date(body.reminderTime),
      timekeepingTypes: body.timekeepingTypes,
      note: body.note,
    };
  } else {
    _params = {
      name: body.name,
      jobType: body.jobType,
      ownerId: body.ownerId,
      members: body.members,
      startTime: new Date(body.startTime),
      reminderTime: new Date(body.reminderTime),
      timekeepingTypes: body.timekeepingTypes,
      note: body.note,
    };
  }
  const job = await Job.create(_params);
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
  var results = await Job.find({
    ownerId: req.query.ownerId,
  }).sort({updatedAt: -1})
    .populate("members")
    .populate({
      path: "members",
      populate: "devices",
    })
    .populate("timekeepingTypes")
    .populate("timekeepings");
    if (req.query.limit) {
      results = results.slice(0, req.query.limit);
    }
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

exports.getDetailById = async (req, res) => {
  const _id = req.params.id;
  let job = await Job.findOne({
    _id: { $eq: _id },
  })
    .populate("members")
    .populate({
      path: "members",
      populate: "devices",
    })
    .populate("timekeepingTypes")
    .populate("timekeepings");
  if (job) {
    return res.status(200).json({
      success: true,
      message: "Thành công.",
      data: job,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Đã xảy ra lỗi.",
      data: null,
    });
  }
};
