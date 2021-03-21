// importing modules
let request = require("request");
let cheerio = require("cheerio");
let repoObject = require("./repo");

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
        repoObject.repoMod(topicUrl);
    }
}

