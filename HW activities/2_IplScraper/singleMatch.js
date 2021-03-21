let request = require("request") ;
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");


// single match handler
function singleMatchHandler(link){
    request(link, singleMatchCb);
}

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
    
}

module.exports = {
    singleMatchMod : singleMatchHandler
}