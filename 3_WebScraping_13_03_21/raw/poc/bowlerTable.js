let request = require("request");
let cheerio = require("cheerio");
let url  = "https://www.espncricinfo.com/series/ipl-2019-1165643/chennai-super-kings-vs-mumbai-indians-final-1181768/full-scorecard"
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
    let bowlTable = selectorTool(".table.bowler");
    console.log(bowlTable.length);
    // rule -> index, cheerioselector

/*     let table =  selectorTool(bowlTable[0]).html();
    let table1 =  selectorTool(bowlTable[1]).html();
    console.log(table);
    console.log(table1); */

    for(let i=0;i<bowlTable.length;i++){
        let table =  selectorTool(bowlTable[0]).html();
    }
}
console.log("After");