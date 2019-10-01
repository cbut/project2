var PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    url: 'https://gateway-fra.watsonplatform.net/personality-insights/api',
    iam_apikey: process.env.PERSONALITY_INSIGHTS_IAM_APIKEY,
});

personalityInsights.profile(
    {
        content: 'Hm... Not so funny. I think we need the full teaching-team in class in the project-time so much more than  in those times, when Hendrik just gives his lectures. To be honest, I don\'t understand, why you are doing that, and I don\'t think it\'s good for us.Don\'t want to offend someone, but there were these times in project 1 when no teacher in class was available (that means occupied) for some time, because one teacher can only help one project at  the same time. I agree with Lena - just realized 2 days ago that we won’t have full support in this project, maybe we can have another TA for these days? Wouldn’t be cool to realize only tomorrow at any time that 2 to 13 isn’t enoug ah yes, I talked about this with Fairouz before and also with Victor and Fred..I wanted to also discuss with the entire class but I unfortunately forgot to do so.I actually asked Mir to take the vacation early during the project time(this and next Sat, and a Tue) because the later in a project the more support is always needed.I also talked to Veronika and she can try and organize another TA for next Saturday(maybe someone from Full- Time is willing to fill in) – this Sat is too short notice unfortunately.Of course this time we only have half the number of projects(since most everyone is working in groups) which usually means enough support for everyone, especially in the beginning of the projects.I personally think we’re going to be fine with just two Hendriks( : zwinkern: ) during Mirs vacation now, but  we can simply have a quick discussion about this tomorrow in classEnter more than 100 unique words here...',
        content_type: 'text/plain',
        consumption_preferences: true
    })
    .then(result => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    }); 