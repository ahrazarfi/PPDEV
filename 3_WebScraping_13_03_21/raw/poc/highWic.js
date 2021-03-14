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

    // fetch bowler tables
    let bowlerTable = selectorTool(".table.bowler");
    // let stringHtml = "";
    // for (let index = 0; index < bowlerTable.length; index++) {
    //     stringHtml += selectorTool(bowlerTable[index]).html();
    // }

    let name = "";
    let highestWkt = 0;

    for(let i=0;i<bowlerTable.length;i++){
        
        let singleInBowl = selectorTool(bowlerTable[i]).find("tbody>tr");
        
        for(let j=0;j<singleInBowl.length;j++){
            let bowlCol = selectorTool(singleInBowl[j]).find("td");
/*             let name = selectorTool(bowlCol[0]).text();
            let wkt = selectorTool(bowlCol[4]).text();
            console.log("Name->", name, "Wickets->", wkt); */

            
        } 
        console.log("```````````````````````````````````");
    }

    // console.log(stringHtml);
}
console.log("After");