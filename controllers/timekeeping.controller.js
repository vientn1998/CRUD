const { Timekeeping } = require("../models/timekeeping.model");
const { TimekeepingType } = require("../models/timekeepingType.model");
const { Job } = require("../models/job.model")
const { ObjectId } = require("mongodb");

exports.create = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(200).json({
      success: false,
      data: null,
      message: "Vui lòng nhập dữ liệu.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  if (!body.timekeepingTypeId) {
    return res.status(200).json({
      success: false,
      data: null,
      message: "Vui lòng chọn loại công việc.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  let timekeepingTypeDb = await TimekeepingType.findOne({
    _id: ObjectId(body.timekeepingTypeId),
  });
  if (!timekeepingTypeDb) {
    return res.status(200).json({
      success: false,
      data: null,
      message: "Không tìm thấy loại công việc.",
      code: 400,
      errorCode: "CREATE_FAILED",
    });
  }
  var salary = 0.0;
  if (body.salary) {
    //caculator
    salary = body.totalTime * body.salary;
  } else {
    //get salary  default
    if (timekeepingTypeDb.type == "day") {
      salary = timekeepingTypeDb.salary;
    } else {
      salary = body.totalTime * timekeepingTypeDb.salary;
    }
  }

  const timekeeping = await Timekeeping.create({
    jobId: body.jobId,
    userId: body.userId,
    startTime: body.startTime,
    endTime: body.endTime,
    totalTime: body.totalTime,
    salary: salary,
    note: body.note,  
  });
  if (timekeeping != null) {
    const _job = await Job.findById(body.jobId);
    var _totalChecked = _job.totalChecked + 1;
    var _timekeepings = [];
    if (_job.timekeepings.length < 7) {
      // add to list
      _job.timekeepings.push(timekeeping);
      _timekeepings = _job.timekeepings;
    } else {
      _job.timekeepings.push(timekeeping)
      _timekeepings = _job.timekeepings.slice(1, _job.timekeepings.length)
    }
    const _jobUpdated = await Job.findOneAndUpdate({
      _id: body.jobId
    }, {
      timekeepings: _timekeepings,
      totalChecked: _totalChecked,
      totalSalary: (_job.totalSalary + salary)
    })
    if (_jobUpdated) {
      return res.status(200).json({
        success: true,
        data: timekeeping,
        message: "Tạo thành công.",
        code: 200,
      });
    } else {
      return res.status(200).json({
        success: false,
        data: null,
        message: "Đã xảy ra lỗi.",
        code: 400,
        errorCode: "CREATE_FAILED",
      });
    }
    
  } else {
    return res.status(200).json({
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
  let timekeepingType = await TimekeepingType.findOne({
    _id: ObjectId(body.timekeepingTypeId),
  });
  var salary = 0.0;
  if (body.salary) {
    salary = body.totalTime * body.salary;
  } else {
    salary = body.totalTime * timekeepingType.salary;
  }
  let timekeeping = await Timekeeping.findOneAndUpdate(
    {
      _id: ObjectId(body.id),
    },
    {
      startTime: body.startTime,
      endTime: body.endTime,
      totalTime: body.totalTime,
      salary: salary,
      note: body.note,
    },
    { new: true }
  );
  if (timekeeping != null) {
    return res.status(200).json({
      success: true,
      data: timekeeping,
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
  let results = await Timekeeping.find({
    jobId: req.query.jobId,
    userId: req.query.userId,
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
