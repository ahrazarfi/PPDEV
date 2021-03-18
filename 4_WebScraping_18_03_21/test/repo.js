// importing modules
let request = require("request");
let cheerio = require("cheerio");
let issuesObject = require("./issues");
let path = require("path");
let fs = require("fs");

function repo(topicUrl) {
    request(topicUrl, repoCb);

    //callback function
    function repoCb(error, response, html){
        if(error){
            console.log(error);
        } else {
            extractRepo(html);
        }
    }
}

function extractRepo(html) {
    let gitBaseUrl = "https://github.com";
    let sel = cheerio.load(html);
    let repoName = sel(".h1-mktg").text();
    console.log(repoName);
    let repoLinkArr = sel(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");

    for(let i = 0;i<8;i++){
         let repoLink = gitBaseUrl + sel(repoLinkArr[i]).attr("href");
         console.log(repoLink);
         let issuesLink = repoLink + "/issues"
        //  console.log(issuesLink);
        issuesObject.issuesMod(issuesLink);
    }
}

// exporting the module
module.exports = {
    repoMod : repo
}