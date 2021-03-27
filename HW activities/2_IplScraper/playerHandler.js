let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");

function playerHandler(
  selTool,
  batCol,
  jsonFilePath,
  playerName,
  opponentName,
  date,
  venue,
  result
) {
  let runs = selTool(batCol[2]).text();
  let balls = selTool(batCol[3]).text();
  let fours = selTool(batCol[5]).text();
  let sixes = selTool(batCol[6]).text();
  let sr = selTool(batCol[7]).text();

  let playerArr = [];

  let playerObj = {
    "Player Name": playerName,
    Runs: runs,
    Balls: balls,
    Fours: fours,
    Sixes: sixes,
    "Strike Rate": sr,
    Date: date,
    Venue: venue,
    "Opponent Name": opponentName,
    Result: result,
  };

  playerArr.push(playerObj);

  fs.appendFileSync(jsonFilePath, JSON.stringify(playerArr, null, 5));
}

module.exports = {
  player: playerHandler,
};
