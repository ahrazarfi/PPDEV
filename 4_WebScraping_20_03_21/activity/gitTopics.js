// importing modules
let request = require("request");
let cheerio = require("cheerio");

// url for github topics page
let url =  "https://github.com/topics";

request(url, cb);

// callback function
function cb(error, response, html){
    if(error){
        console.log(error);
    } else {
        extractGitTopics(html);
    }
}

// code for extracting Git topics 
function extractGitTopics(html){
    let sel = cheerio.load(html);
    
    let topicLinkArr = sel(".col-12.col-sm-6.col-md-4.mb-4");

    // array to print topic name
    for(let i = 0; i<topicLinkArr.length;i++){
        // let topic = sel(topicLinkArr[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text();
        let topicUrl = url + "/" + sel(topicLinkArr[i]).find("a").attr("href").split("/").pop();
        repo(topicUrl);
    }

}

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

// extracting RepoLinks
function extractRepo(html) {
    let gitBaseUrl = "https://github.com";
    let sel = cheerio.load(html);
    let topicName = sel(".h1-mktg").text();
    console.log(topicName);
    let repoLinkArr = sel(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");

    for(let i = 0;i<8;i++){
         let repoLink = gitBaseUrl + sel(repoLinkArr[i]).attr("href");
         let issuesLink = repoLink + "/issues"
        //  console.log(repoLink);
        issues(issuesLink, );
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