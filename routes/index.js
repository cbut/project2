var express = require("express");
var router = express.Router();
var PersonalityInsightsV3 = require("ibm-watson/personality-insights/v3");

const User = require("../models/user");

var personalityInsights = new PersonalityInsightsV3({
    version: "2017-10-13",
    url: "https://gateway-fra.watsonplatform.net/personality-insights/api"
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', user: req.user });
});

router.post("/", function (req, res, next) {
    const inputText = req.body.submittedText;
    personalityInsights
        .profile({
            content: inputText,
            content_type: "text/plain",
            consumption_preferences: true
        })
        .then(result => {
            console.log(result);
            console.log(result.word_count);
            User.create({ reports: [result] });
            // update user by using $push mongo functionality
            res.render("results", result);
            // console.log(JSON.stringify(result, null, 2));
        })
        .catch(err => {
            console.log("error:", err);
        });
});


module.exports = router;
