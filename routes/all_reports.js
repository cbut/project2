var express = require("express");
var router = express.Router();

const User = require("../models/user");

/* displays results */
router.get("/", function(req, res, next) {
  User.find({}).then(allTheData => {
    console.log(allTheData);
    res.render("all_reports/index", { reports: allTheData });
  });
  // res.send('respond with a resource');
});

// GET /all_reports/:report_id/delete
router.get("/:report_id/delete", function(req, res, next) {
  const toBeDeleted = req.params.report_id;
  User.findByIdAndRemove(toBeDeleted).then(toBeDeleted => {
    res.redirect("/all_reports/");
  });
});

// GET /all_reports/:report_id/edit
router.get("/:report_id/edit", function(req, res, next) {
  User.findById(req.params.room_id).then(report => {
    console.log(report);
    res.render("all_reports/edit", { report });
  });
});

// POST /all_reports/:room_id
router.post("/:report_id", function(req, res, next) {
  let opennessLocationInDatabase = req.params.report_id;
  let { opennessPercentile } = req.body;
  console.log(opennessLocationInDatabase + "  " + opennessPercentile);
  // User.findByIdAndUpdate(req.params.report_id, {opennessPercentile}).then(() => {
  // }
});

module.exports = router;
