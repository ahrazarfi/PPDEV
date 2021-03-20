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
         let issuesLink = repoLink + "/issues"
        //  console.log(issuesLink);
        console.log(repoLink);
        issues(issuesLink);
        // issuesObject.issuesMod(issuesLink);
        
    }
}


// issues function, it receives link of each repos issues page.
function issues(issuesLink) {
    request(issuesLink, issuesCb);

    // callback function
    function issuesCb(error, response, html) {
        if(error){
            console.log(error);
        } else{
            extractIssues(html);
        }
    }

    // this function extracts open issues from the github issues page for the specific repo
    function extractIssues(html) {
        let sel = cheerio.load(html)
        let issuesArr = sel("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");

        let gitBaseUrl = "https://github.com";
        let issue = [];
        // array for open issues
        for(let i=0;i<issuesArr.length;i++){
            let issueName = sel(issuesArr[i]).text();
            let issueLink = gitBaseUrl + sel(issuesArr[i]).attr("href");
            console.table()
            let issueObj = {
                Name : issueName,
                Link : issueLink
            }
            issue.push(issueObj);
            
        }
        console.table(issue);
    }

}



// exporting the module
module.exports = {
    repoMod : repo
}