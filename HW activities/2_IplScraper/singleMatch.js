let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let dirAndFileObj = require("./dirAndFileCreator");
let playerObj = require("./playerHandler");

function singleMatchHandler(link, folderPath) {
  request(link, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      singleMatchExtractor(html, folderPath);
    }
  });
}

function singleMatchExtractor(html, folderPath) {
  var selTool = cheerio.load(html);
  let teamNameArr = selTool(".name-link .name");

  // these props will be same for every player for a given single match link
  let dateVenueData = selTool(
    ".match-info.match-info-MATCH .description"
  ).text();
  let venue = dateVenueData.split(",")[1];
  let date = dateVenueData.split(",")[2];
  let result = selTool(".match-info.match-info-MATCH .status-text>span").text();

  let batsmenTables = selTool(".table.batsman");
  // instead of using another selector for extracting batsmen tables(total=2), we are utilizing the same loop which is being used below for team directory creation as both loops run for 2 iterations
  for (let i = 0; i < 2; i++) {
    //?? doubt: if condition is till teamNameArr.length, program doesnt work and goes into infinite loop, even tho the function is receiving a link and extracting only two things using the selectors. why? the used approach is a hacker approach where we know that we are only selecting two props so loop is iterated till 2 only.
    let teamName = selTool(teamNameArr[i]).text();

    // function to set Opponent Name
    let opponentName = (function opponentSetter() {
      if (i == 0) {
        var opponentName = selTool(teamNameArr[1]).text();
        return opponentName;
      } else {
        var opponentName = selTool(teamNameArr[0]).text();
        return opponentName;
      }
    })();

    let teamFolderPath = dirAndFileObj.dirCreator(folderPath, teamName);

    let singleTeamBatsmanTable = selTool(batsmenTables[i]).find("tbody tr");

    for (let j = 0; j < singleTeamBatsmanTable.length - 1; j += 2) {
      let batCol = selTool(singleTeamBatsmanTable[j]).find("td");
      let playerName = selTool(batCol[0]).text().trim();
      // let filePath = dirAndFileObj.jsonFileCreator();
      // console.log(playerName);
      let jsonFilePath = dirAndFileObj.jsonFileCreator(
        teamFolderPath,
        playerName
      );
      playerObj.player(
        selTool,
        batCol,
        jsonFilePath,
        playerName,
        opponentName,
        date,
        venue,
        result
      );
    }
  }
}

// console.log("I am outside");
module.exports = {
  singleMatch: singleMatchHandler,
};
