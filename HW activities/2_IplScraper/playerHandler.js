let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");

function playerHandler(team, link){
    request(link, playerHandlerCb);

    //callback function
    function playerHandlerCb(error, response, html){
        if(error){
            console.log(error);
        } else{
            playerExtractor(team, html);
        }
    }
}

// function to handle Player Data from individual match link
function playerExtractor(team, html) {
    let sel = cheerio.load(html);
    let playerArr = [];

    // batsman table
    let batTable = sel(".table.batsman");

    for (let i = 0; i < batTable.length; i++) {

        let singleInBat = sel(batTable[i]).find("tbody>tr");

        for (let j = 0; j < singleInBat.length; j++) {
            let batCol = sel(singleInBat[j]).find("td");
            let playerName = sel(batCol[0]).text();
            let runs = sel(batCol[2]).text();
            let balls = sel(batCol[3]).text();
            let fours = sel(batCol[5]).text();
            let sixes = sel(batCol[6]).text();
            let sr = sel(batCol[7]).text();

            let playerObj = {
                "Player Name" : playerName,
                "Runs"  : runs,
                "Balls" : balls,
                "Fours" : fours,
                "Sixes" : sixes,
                "Strike Rate"   : sr
            }

            playerArr.push(playerObj);
        }
        console.table(playerArr);
    }

    
}

module.exports = {
    playerHandlerMod : playerHandler
}