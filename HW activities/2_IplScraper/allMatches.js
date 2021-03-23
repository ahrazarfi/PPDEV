let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let singleMatchObj = require("./singleMatch")
let dirAndFileObj = require("./dirAndFileCreator")

function allMatchesExtractor(html){
    let selTool = cheerio.load(html);
    let allMatchArr = selTool(".match-info-link-FIXTURES");

    let espnUrl = "https://www.espncricinfo.com";

    // creates base folder for all IPL teams
    let folderPath = dirAndFileObj.createIPLFolder;

    for(let i=0;i<allMatchArr.length;i++){
        let matchLink = espnUrl + selTool(allMatchArr[i]).attr("href");
        // console.log(matchLink);
        singleMatchObj.singleMatch(matchLink, folderPath);
    }
}

module.exports = {
    allMatches : allMatchesExtractor
}