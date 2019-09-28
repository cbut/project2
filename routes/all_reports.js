var express = require("express");
var router = express.Router();

const User = require("../models/user");
//write middleware is authenticated to redirect if not 

/* displays results */
router.get("/", function (req, res, next) {
    User.findById(req.user._id).then(user => {
        console.log(user);
        res.render("all_reports/index", { reports: user.reports });
    });
    // res.send('respond with a resource');
});

// GET /all_reports/:report_id/delete
router.get("/:report_id/delete", function (req, res, next) {
    const toBeDeleted = req.params.report_id;
    User.findByIdAndRemove(toBeDeleted).then(toBeDeleted => {
        res.redirect("/all_reports/");
    });
});

// GET /all_reports/:report_id/edit  => edit page for the "note" of a report
router.get("/:report_id/edit", function (req, res, next) {
    User.findById(req.params.report_id).then(report => {
        console.log(report);
        res.render("all_reports/edit", { report });
    });
});

// POST / all_reports /: report_id    => POST from Edit page, updating the "note" of a report
router.post("/:report_id", function (req, res, next) {
    let { note } = req.body
    User.findByIdAndUpdate(req.params.report_id, { note }).then(() => {
        res.redirect("/all_reports/");
    })
});


module.exports = router;
