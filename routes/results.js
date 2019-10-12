var express = require("express");
var router = express.Router();

/* displays results */
router.get("/", function (req, res, next) {
  //query current user and add the last report to the view
  user = req.user
  lastReport = req.user.reports[req.user.reports.length - 1]
  res.render("results", { lastReport, user });
});
module.exports = router; 
