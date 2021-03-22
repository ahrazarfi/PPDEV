let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let pdf = require("pdfkit");

let allMatchResultsPageUrl = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function allMatchResultsHandler(url){
    request(url, allMatchResultsCb);
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

        let team= [];
        //array to create team directory
        for(let i=0;i<teamArr.length;i++){
            var teamName = sel(teamArr[i]).text();
            // console.log(teamName);
            if(team.includes(teamName) == false){
                team.push(teamName);
            }
            
            // teamNameDirectoryCreator(teamName);
        }

        //array for match URL
        for(let i=0;i<scorecardArr.length;i++){
            let matchLink = espnUrl + sel(scorecardArr[i]).attr("href");
            // console.log(matchLink);
            singleMatchHandler(matchLink, );
        }
        
        
    }

    // this function takes team name as a parameter and check if the path exists otherwise makes a folder
    function teamNameDirectoryCreator(team){
        let pathofDirectory = path.join(__dirname + "/Teams", team)
        if(fs.existsSync(pathofDirectory) == false) {
            fs.mkdirSync(pathofDirectory);
            return pathofDirectory;
        } else {
            return pathofDirectory;
        }
        
    }

}

allMatchResultsHandler(allMatchResultsPageUrl);


























































// single match handler
function singleMatchHandler(link){
    request(link, singleMatchCb);

    //callback function
    function singleMatchCb(error, response, html){
        if(error){
            console.log(error);
        } else {
            singleMatchExtractor(html);
        }
    }

    //single Match data extractor function
    function singleMatchExtractor(html){
        
        let selectorTool = cheerio.load(html);
        // team name extraction
        let team = selectorTool(".section-header.border-bottom.text-danger.cursor-pointer .header-title.label");
        let dateVenueData = selectorTool(".match-info.match-info-MATCH .description").text();
        let batTable = selectorTool(".table.batsman");
        let venue = dateVenueData.split(",")[1];
        let date = dateVenueData.split(",")[2];
        let result = selectorTool(".match-info.match-info-MATCH .status-text>span").text();
        let teamName = [];
        
        for (let i = 0; i < team.length; i++) {
            let tname = selectorTool(team[i]).text();
            tname = tname.split("INNINGS")[0];
            teamName.push(tname);
            let pathOfFile = createDirectory(teamName[i]);
            let playerArr= [];
            // playerExtractor(teamName[i], date, venue, result);
            let singleInBat = selectorTool(batTable[i]).find("tbody>tr");
                for (let j = 0; j < singleInBat.length; j++){
                    let batCol = selectorTool(singleInBat[j]).find("td");
                    var playerName = selectorTool(batCol[0]).text().trim();
                    // let path = createFile(pathOfFile, playerName);
                    let runs = selectorTool(batCol[2]).text();
                    let balls = selectorTool(batCol[3]).text();
                    let fours = selectorTool(batCol[5]).text();
                    let sixes = selectorTool(batCol[6]).text();
                    let sr = selectorTool(batCol[7]).text();

                    let playerObj = {
                        "Player Name" : playerName,
                        "Runs"  : runs,
                        "Balls" : balls,
                        "Fours" : fours,
                        "Sixes" : sixes,
                        "Strike Rate"   : sr,
                        "Date"  : date,
                        "Venue" : venue,
                        "Result"    : result
                    }
                    playerArr.push(playerObj);

                    let pathOfFile1 = path.join(__dirname + "/Teams", tname, playerName + ".pdf"); 

                let pdfObject =  new pdf;
                pdfObject.pipe(fs.createWriteStream(pathOfFile1));
                pdfObject.text(JSON.stringify(playerArr, null, 5));
                pdfObject.end();
                }
                
                // console.table(playerArr);
                // fs.writeFileSync(__dirname + "/Teams", tname, JSON.stringify(playerArr));
                
        }

        

        // this function takes team name as a parameter and check if the path exists otherwise makes a folder
        function createDirectory(team){
            let pathofDirectory = path.join(__dirname + "/Teams", team)
            if(fs.existsSync(pathofDirectory) == false) {
                fs.mkdirSync(pathofDirectory);
                return pathofDirectory;
            } else {
                return pathofDirectory;
            }
            
        }

/*         function createFile(filepath, playerName){
            let filePath = path.join(filepath, playerName + ".json")
            if(fs.existsSync(filePath) == false) {
                let createStream = fs.createWriteStream(filePath);
                createStream.end();
                return filePath;
            }else{
                return filePath;
            }
        } */
    }
}


