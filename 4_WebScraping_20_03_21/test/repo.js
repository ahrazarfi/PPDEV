// importing modules
let request = require("request");
let cheerio = require("cheerio");
let issuesObject = require("./issues");
let path = require("path");
let fs = require("fs");
let pdf = require("pdfkit");

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
    let topicName = sel(".h1-mktg").text().trim();  // as the topic name consists of empty whitespaces, we need to use trim()
    // console.log(topicName);
    createDirectory(topicName);
    let repoLinkArr = sel(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");

    for(let i = 0;i<8;i++){
         let repoLink = gitBaseUrl + sel(repoLinkArr[i]).attr("href");
         let repoName = repoLink.split("/").pop();
        //  console.log(repoName);
         let issuesLink = repoLink + "/issues";

        //  console.log(issuesLink);
        // console.log(repoLink);
                // issues(issuesLink, topicName, repoName);
        issuesObject.issuesMod(issuesLink, topicName, repoName);
        
    }
}


function createDirectory(topicName) {
    let pathofDirectory = path.join(__dirname + "/output", topicName);
    fs.mkdirSync(pathofDirectory);
}

// exporting the module
module.exports = {
    repoMod : repo
}