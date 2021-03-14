let request = require("request");
let cheerio = require("cheerio");
console.log("Before");
request("https://www.google.com", cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {        
        extractHtml(html);
    }
}
console.log("After");

function extractHtml(html) {

    let selectorTool = cheerio.load(html);
    let selectElem = selectorTool("#SIvCob"); // gives the specific element
    //console.log(selectElem.text());

    console.log(selectElem.html());
}