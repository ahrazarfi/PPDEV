let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2019-1165643/chennai-super-kings-vs-mumbai-indians-final-1181768/full-scorecard"
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

    // team name extraction
    let team = selectorTool(".section-header.border-bottom.text-danger.cursor-pointer .header-title.label");
    let teamName = [];
    for (let i = 0; i < team.length; i++) {
        let tname = selectorTool(team[i]).text();
        tname = tname.split("INNINGS")[0];
        teamName.push(tname);
    }

    // batsman table
    let batTable = selectorTool(".table.batsman");


    for (let i = 0; i < batTable.length; i++) {

        let singleInBat = selectorTool(batTable[i]).find("tbody>tr>.batsman-cell.text-truncate.out");

        for (let j = 0; j < singleInBat.length; j++) {
            let playerName = selectorTool(singleInBat[j]).text();

            console.log(playerName, " plays for ", teamName[i]);
        }
        console.log("```````````````````````````````````");
    }

}
