/* // importing modules
let request = require("request");
let cheerio = require("cheerio");


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
        console.log(issue);
    }
   


    
}


module.exports = {
    issuesMod : issues
} */