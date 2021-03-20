// importing modules
let request = require("request");
let cheerio = require("cheerio");


// url for 
let url =  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url, cb);

// callback function
function cb(error, response, html){
    if(error){
        console.log(error);
    } else {
        extractScorecardUrl(html);
    }
}

// code for extracting Scorecard
function extractScorecardUrl(html){
    let sel = cheerio.load(html);
    
    let summaryArr = sel(".match-cta-container a[data-hover=Summary]");

    for(let i = 0; i<summaryArr.length;i++){
        let scorecardUrl = "https://www.espncricinfo.com" + sel(summaryArr[i]).attr("href");
        // console.log(scorecardUrl);
        extractPotm(scorecardUrl);
    }
}

// code for handling player of the match url
function extractPotm(scorecardUrl) {
    request(scorecardUrl, scoreCb);

    // callback function
    function scoreCb(error, response, html) {
        if(error){
            console.log(error);
        } else{
            extractPMname(html);
        }
    }

    // code for extracrting player of the match
    function extractPMname(html) {
        let sel = cheerio.load(html)
        let playerName = sel(".best-player-name a").text();
        console.log(playerName);
    }

}

