const { Timekeeping } = require("../models/timekeeping.model");
const { TimekeepingType } = require("../models/timekeepingtype.model");
const { ObjectId } = require("mongodb");

exports.pullImage = async (req, res) => {
  const { page, size, last_synced, user_ids } = req.query;
  const user_id = req.user_id;
  const { limit, offset } = getPagination(page, size);
  const synce_condition = last_synced ? last_synced : 0;
  const condition = user_ids
    ? {
        user_id: { $in: user_ids.split(",") },
        synced_time: { $gt: synce_condition },
      }
    : { $and: [{ user_id }, { synced_time: { $gt: synce_condition } }] };
  Image.paginate(condition, {
    limit,
    offset,
    sort: !last_synced ? { synced_time: "desc" } : { synced_time: "asc" },
  })
    .then(async (result) => {
      //console.log(result.docs);
      result.docs.forEach(function (element, index) {
        result.docs[index].path = element.path.replace("public", "");
      });
      return res.json({
        success: !!result.docs,
        data: result.docs,
        totalPages: result.totalPages,
        currentPage: result.page,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: !!error,
        message: "Pull image error",
      });
    });
};

exports.pushImage = async (req, res) => {
  console.log(res.file);
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'The field "id" is required.',
      code: 400,
      errorCode: "REQUIRE_id",
    });
  }

  if (!req.body.user_id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'The field "user_id" is required.',
      code: 400,
      errorCode: "REQUIRE_user_id",
    });
  }

  if (!req.body.expense_id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'The field "expense_id" is required.',
      code: 400,
      errorCode: "REQUIRE_expense_id",
    });
  }
  let checkExistedImage = await Image.findOne({
    id: req.body.id,
    user_id: req.body.user_id,
    expense_id: req.body.expense_id,
  });
  last_synced = new Date();
  if (!checkExistedImage) {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'The field "image" is required and only jpeg|jpg|png|gif',
        code: 400,
        errorCode: "REQUIRE_image",
      });
    }
    await Image.create({
      id: req.body.id,
      user_id: req.body.user_id,
      expense_id: req.body.expense_id,
      income_id: req.body.income_id,
      borrow_id: req.body.borrow_id,
      loan_id: req.body.loan_id,
      repayment_id: req.body.repayment_id,
      collection_id: req.body.collection_id,
      path: req.file.path,
      created_date: req.body.created_date,
      modified_date: req.body.modified_date,
      is_deleted: req.body.is_deleted,
      synced_time: last_synced,
    });
  } else {
    if (req.body.modified_date > checkExistedImage.modified_date) {
      var file_path = checkExistedImage.path;
      if (req.file || req.body.is_deleted == true) {
        let resultHandler = function (err) {
          if (err) {
            console.log("unlink failed", err);
          } else {
            console.log("file deleted");
          }
        };
        //Delete file image
        fs.unlink(checkExistedImage.path, resultHandler);
        if (req.file) {
          file_path = req.file.path;
        } else {
          file_path = "";
        }
      }

      await Image.findOneAndUpdate(
        { _id: checkExistedImage._id },
        {
          id: req.body.id,
          user_id: req.body.user_id,
          path: file_path,
          expense_id: req.body.expense_id,
          income_id: req.body.income_id,
          borrow_id: req.body.borrow_id,
          loan_id: req.body.loan_id,
          repayment_id: req.body.repayment_id,
          collection_id: req.body.collection_id,
          created_date: req.body.created_date,
          modified_date: req.body.modified_date,
          is_deleted: req.body.is_deleted,
          synced_time: last_synced,
        },
        {
          new: true,
        }
      );
    } else {
      if (req.file) {
        let resultHandler = function (err) {
          if (err) {
            console.log("unlink failed", err);
          } else {
            console.log("file deleted");
          }
        };
        fs.unlink(req.file.path, resultHandler);
      }
    }
  }

  this.sendPushToFamilyMembers(req);

  return res.json({
    success: true,
    message: "Saved image success!!!",
    last_synced: last_synced,
  });
};
