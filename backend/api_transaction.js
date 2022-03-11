const express = require("express");
const router = express.Router();
const Trans = require("./models/trans_schema");

router.post("/transaction", async (req, res) => {
  console.log(req.body);

  try {
    req.body.staff_id = req.userId;
    let doc = await Trans.create(req.body);
    res.json({ result: "ok", message: doc });
  } catch (error) {
    res.json({ result: "nok", message: error });
  }
});

router.get("/transaction", async (req, res) => {
  const result = await Trans.aggregate([
    // {
    //   $match: {
    //     timestamp: {
    //       $gte: new Date("2018-01-01"),
    //       $lt: new Date("2020-09-30"),
    //     },
    //   },
    // },
    {
      $sort: { timestamp: -1 },
    },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff",
      },
    },
    { $unwind: "$staff" },
    {
      $addFields: {
        staff_id: "$staff.username",
      },
    },
    {
      $project: {
        staff: 0,
      },
    },
    {
      $addFields: {
        id: "$transaction_id",
      },
    },
  ]);
  res.json(result);
});

router.get("/transaction_old", (req, res) => {
  Trans.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id",
      },
    },
    { $unwind: "$staff_id" },
  ])
    .sort({ timestamp: -1 })
    .then((result) => {
      let newResult = result.map((item) => {
        item.staff_id = item.staff_id.username;
        return item;
      });

      res.json(newResult);
    });
});

router.get("/transactionv2", (req, res) => {
  Trans.aggregate([
    {
      $match: {
        timestamp: {
          $gte: new Date("2016-08-17"),
          $lt: new Date("2019-08-30"),
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id",
      },
    },
    { $unwind: "$staff_id" },
  ])
    .sort({ timestamp: -1 })
    .then((result) => {
      let newResult = result.map((item) => {
        item.staff_id = item.staff_id.username;
        return item;
      });

      res.json(newResult);
    });
});

module.exports = router;
