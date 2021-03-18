// importing modules
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
    
}


module.exports = {
    issuesMod : issues
}