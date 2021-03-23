const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function createDir(teamName){
    let folderPath = path.join(__dirname, teamName);

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

function createJSON(teamName, batsmenName){
    let filePath = path.join(__dirname, teamName, batsmenName + ".json");

    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath);
        file.end();
    }
    return filePath;
}

function gotMatchLinkHTML(html){
    let selTool = cheerio.load(html);

    let bothTeams = selTool(".name-link .name");
    let team1_Name = selTool(bothTeams[0]).text();
    let team2_Name = selTool(bothTeams[1]).text();

    // console.log("Team 1: ", team1_Name);
    // console.log("Team 2: ", team2_Name);

    createDir(team1_Name);
    createDir(team2_Name);

    // ahraz
    let dateVenueData = selTool(".match-info.match-info-MATCH .description").text();
    let venue = dateVenueData.split(",")[1];
    let date = dateVenueData.split(",")[2];
    let result = selTool(".match-info.match-info-MATCH .status-text>span").text();
    //ahraz

    let batsmenContainer = selTool(".table.batsman"); // get both team batsmen tables
    for(let i=0; i<batsmenContainer.length; i++){
        let team1_batsmen = selTool(batsmenContainer[i]).find("tbody tr"); // for every table get all batsmeen data
        


        for(let j=0; j<team1_batsmen.length-1; j+=2){ // get relevant batsmen row
            // let batsmenAnchor = selTool(team1_batsmen[j]).find("a");
            
            //ahraz
            let playerArr = [];

            let batCol = selTool(team1_batsmen[j]).find("td");
            var batsmenName = selTool(batCol[0]).text().trim();

            let path =  createJSON(selTool(bothTeams[i]).text(), batsmenName);
            
            // handling edge case
            // let a = path.split(".")[0];
            // console.log(path.split(bothTeams[i])[1]);
            // if(a == false){
            //     continue;
            // }

            
        
            function opponentSetter(){
                if(i==0){
                    var opponentName = selTool(bothTeams[1]).text();
                    return opponentName;
                }else{
                    var opponentName = selTool(bothTeams[0]).text();
                    return opponentName;
                }
            }

            let runs = selTool(batCol[2]).text();
            let balls = selTool(batCol[3]).text();
            let fours = selTool(batCol[5]).text();
            let sixes = selTool(batCol[6]).text();
            let sr = selTool(batCol[7]).text();
            let oppName = opponentSetter();

            let playerObj = {
                "Player Name" : batsmenName,
                "Runs"  : runs,
                "Balls" : balls,
                "Fours" : fours,
                "Sixes" : sixes,
                "Strike Rate"   : sr,
                "Date"  : date,
                "Venue" : venue,
                "Opponent Name" : oppName,
                "Result"    : result
            }

            playerArr.push(playerObj);

            fs.appendFileSync(path, JSON.stringify(playerArr, null, 5));
            //ahraz
            
            // let batsmenName = selTool(batsmenAnchor).text();
            // let batsmenLink = selTool(batsmenAnchor).attr("href");

            
        }
    }
}

function getMatchLinkHTML(fullLink){
    request(fullLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            gotMatchLinkHTML(html);
        }
    })
}

function getAllMatches(html){
    let selTool = cheerio.load(html);
    let allMatches = selTool(".match-info-link-FIXTURES"); // anchor tag of all matches( ie 60!)

    for(let i=0; i<allMatches.length; i++){
        let matchLink = selTool(allMatches[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + matchLink;

        // console.log(fullLink);
        getMatchLinkHTML(fullLink);
    }
}

request(url, function(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        getAllMatches(html);
    }
})