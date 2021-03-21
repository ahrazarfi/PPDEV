let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let singleMatchObject = require("./singleMatch");

let allMatchResultsPageUrl = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function allMatchResultsHandler(url){
    request(url, allMatchResultsCb);
}

//callback function
function allMatchResultsCb(error, response, html){
    if(error){
        console.log(error);
    } else{
        allMatchResultExtractor(html);
    }
}

//function to extract all Match scorecards
function allMatchResultExtractor(html) {
    let sel = cheerio.load(html);
    let espnUrl = "https://www.espncricinfo.com";
    let scorecardArr = sel(".match-info-link-FIXTURES");
    let teamArr = sel(".match-info.match-info-FIXTURES p");

/*     //array to create team directory
    for(let i=0;i<teamArr.length;i++){
        var teamName = sel(teamArr[i]).text();
        // console.log(teamName);
        teamNameDirectoryCreator(teamName);
    } */

    //array for scorecard URL
    for(let i=0;i<scorecardArr.length;i++){
        let matchLink = espnUrl + sel(scorecardArr[i]).attr("href");
        // console.log(matchLink);
        singleMatchObject.singleMatchMod(matchLink);
    }
    // console.log(scorecardArr.length); 
}

/* //Team Name Directory Creator
function teamNameDirectoryCreator(team){
    let pathofDirectory = path.join(__dirname + "/Teams", team)
    if(fs.existsSync(pathofDirectory) == false) {
        fs.mkdirSync(pathofDirectory);
    }
}
 */

allMatchResultsHandler(allMatchResultsPageUrl);
