var express = require('express');
var router = express.Router();

const User = require('../models/user')

/* displays results */
router.get('/', function (req, res, next) {
    User.find({}).then((allTheData) => {
        console.log(allTheData)
        res.render('all_reports/index', allTheData)

    })
    // res.send('respond with a resource');
});

module.exports = router;
