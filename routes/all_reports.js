var express = require("express");
var router = express.Router();

const User = require("../models/user");

// middleware
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

/* displays results */
router.get("/", isAuthenticated, function (req, res, next) {

    res.render("all_reports/index", { reports: req.user.reports });

});

// GET /all_reports/:report_id/delete
router.get("/:report_id/delete", function (req, res, next) {
    const toBeDeleted = req.params.report_id;
    // User.findByIdAndRemove(toBeDeleted).then(toBeDeleted => {
    User.updateOne({ _id: req.user._id }, {
        $pull: { "reports": { _id: req.params.report_id } },
    }).then(() => {
        res.redirect("/all_reports/");
    });
});

// GET /all_reports/:report_id/edit  => edit page for the "note" of a report
router.get("/:report_id/edit", function (req, res, next) {
    const report = req.user.reports.find(elem => {
        return elem._id.equals(req.params.report_id);
    });
    res.render("all_reports/edit", { report });
});

// POST / all_reports /: report_id    => POST from Edit page, updating the "note" of a report
router.post("/:report_id", function (req, res, next) {
    let { note } = req.body
    User.updateOne({ _id: req.user._id, "reports._id": req.params.report_id }, {
        $set: { "reports.$.note": note },
    }).then(() => {
        res.redirect("/all_reports/");
    })
});

// GET /all_reports/:report_id/edit_title  => edit page for the "title" of a report
router.get("/:report_id/edit_title", function (req, res, next) {
    const report = req.user.reports.find(elem => {
        return elem._id.equals(req.params.report_id);
    });
    res.render("all_reports/edit_title", { report });
});

// POST / all_reports /: report_id    => POST from Edit page, updating the "note" of a report
router.post("/:report_id/database_edit_title", function (req, res, next) {
    let { title } = req.body
    console.log("post route from all_reports to edit title works")
    User.updateOne({ _id: req.user._id, "reports._id": req.params.report_id }, {
        $set: { "reports.$.title": title },
    }).then(() => {
        res.redirect("/all_reports/");
    })
});

module.exports = router;
