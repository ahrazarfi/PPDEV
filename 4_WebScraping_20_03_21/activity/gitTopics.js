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
    let repoName = sel(".h1-mktg").text();
    console.log(repoName);
    let repoLinkArr = sel(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");

    for(let i = 0;i<8;i++){
         let repoLink = gitBaseUrl + sel(repoLinkArr[i]).attr("href");
         let issuesLink = repoLink + "/issues"
         console.log(repoLink);
    }
}
