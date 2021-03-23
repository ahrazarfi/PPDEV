let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let singleMatchObj = require("./singleMatch")
let dirAndFileObj = require("./dirAndFileCreator")

function allMatchesExtractor(html){
    let selTool = cheerio.load(html);
    let allMatchArr = selTool(".match-info-link-FIXTURES");

    let tournamentName = selTool(".row.no-gutters.align-items-center h5").text().replace("/",("_")).trim();
    let espnUrl = "https://www.espncricinfo.com";

    // console.log(tournamentName);
    // creates base folder for all IPL teams
    let folderPath = dirAndFileObj.createIPLFolder(tournamentName);

    for(let i=0;i<allMatchArr.length;i++){
        let matchLink = espnUrl + selTool(allMatchArr[i]).attr("href");
        // console.log(matchLink);
        singleMatchObj.singleMatch(matchLink, folderPath);
    }
}

module.exports = {
    allMatches : allMatchesExtractor
}