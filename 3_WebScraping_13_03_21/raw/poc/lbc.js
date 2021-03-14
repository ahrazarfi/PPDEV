let request = require("request");
let cheerio = require("cheerio");
let url  = "https://www.espncricinfo.com/series/ipl-2019-1165643/chennai-super-kings-vs-mumbai-indians-final-1181768/ball-by-ball-commentary"
console.log("Before");
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {        
        extractHtml(html);
    }
}


function extractHtml(html) {

    let selectorTool = cheerio.load(html);
    let allComments = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    console.log(allComments.length);
    // rule -> index, cheerioselector

    let lastComment =  selectorTool(allComments[0]).text();
    console.log(lastComment);
}
console.log("After");