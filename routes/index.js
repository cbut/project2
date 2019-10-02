var express = require("express");
var router = express.Router();
var PersonalityInsightsV3 = require("ibm-watson/personality-insights/v3");

const User = require("../models/user");

let personalityInsights = new PersonalityInsightsV3({
    version: "2017-10-13",
    url: "https://gateway-fra.watsonplatform.net/personality-insights/api"
});

const PersonalityTextSummaries = require('personality-text-summary');
const v3EnglishTextSummaries = new PersonalityTextSummaries({
    locale: 'en',
    version: 'v3'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', user: req.user, textSummary: req.session.textSummary });
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
            let textSummary = v3EnglishTextSummaries.getSummary(result);
            result.summary = textSummary
            if (req.user) {
                console.log(req.user)
                User.findByIdAndUpdate(req.user._id, { $push: { reports: result } }).then(() => {
                    res.redirect('results/')
                })
            } else {
                console.log(textSummary)
                req.session.textSummary = textSummary
                res.redirect('/')
                //res.render("index", { textSummary, user: req.user });
            }
        })
        .catch(err => {
            console.log("error:", err);
        });
});


module.exports = router;
