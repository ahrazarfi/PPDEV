let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let teamCreatorObject = require("./teamCreator");
let playerHandlerObject = require("./playerHandler");


// single match handler
function singleMatchHandler(link){
    request(link, singleMatchCb);
    //callback function
    function singleMatchCb(error, response, html){
        if(error){
            console.log(error);
        } else {
            singleMatchExtractor(html, link);
        }
    }
}



//single Match data extractor function
function singleMatchExtractor(html, link){
    let sel = cheerio.load(html);
    let teamArr = sel(".match-info.match-info-MATCH .teams .name-detail .name");

    let teamName = [];
    //array for extracting team Name
    for(let i=0;i<teamArr.length;i++){
        let tname = sel(teamArr[i]).text();
        // console.log(teamName);
        teamName.push(tname);
        // teamCreatorObject.teamCreator(teamName);
        let teamFolderPath = teamCreatorObject.teamCreator(teamName[i]);
        // console.log(teamFolderPath);
        
    }

    playerHandlerObject.playerHandlerMod(teamName, html );
}

module.exports = {
    singleMatchMod : singleMatchHandler
}