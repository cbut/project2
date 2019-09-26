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

// GET /rooms/:room_id/edit
router.get("/:report_id/delete", function(req, res, next) {
  const toBeDeleted = req.params.report_id;
  User.findByIdAndRemove(toBeDeleted).then(toBeDeleted => {
    res.redirect("/all_reports/");
  });
});

module.exports = router;
