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
    let scorecard = [];
    for(let i = 0; i<summaryArr.length;i++){
        let scorecardUrl = "https://www.espncricinfo.com" + sel(summaryArr[i]).attr("href");
        // console.log(scorecardUrl);
        // extractPotm(scorecardUrl);
        scorecard.push(scorecardUrl);
    }

    extractPotm(scorecard, 0);
    
}

/* 

Why for loop doesnt work for serial approach?
because a deadlock occurs between the callback function which is waiting for the for loop to be incremented so its removed from the stack and callback can go the stack to increment the loop while loop is waiting  for it to be incremented by the callback function. (see image below and the code plus memory architecture.)

snips/2021-03-20-15-54-53.png 

SOLUTION:

fs.readfile will go on stack first and fs.readFile will also go on stack, now since fs.readFile is an async function so it will go to the NodeAPI.
.....(explanation in diary

snips/2021-03-20-16-23-19.png

*/

// code for handling player of the match url
function extractPotm(scorecard, n) {
    if(n == scorecard.length){
        return;
    }
    request(scorecard[n], cb);
    function cb(error, request, html) {
        if(error){
            console.log(error);
        } else {
            extractPMname(html);
            extractPotm(scorecard, n+1)
        }
    }
    

    // code for extracting player of the match
    function extractPMname(html) {
        let sel = cheerio.load(html)
        let playerName = sel(".best-player-name a").text();
        console.log(playerName);
    }
}

