let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2019-1165643/chennai-super-kings-vs-mumbai-indians-final-1181768/full-scorecard"
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractData(html);
    }
}


function extractData(html) {

    let selectorTool = cheerio.load(html);

    // batsman table
    let batTable = selectorTool(".table.batsman");


    for (let i = 0; i < batTable.length; i++) {

        let singleInBat = selectorTool(batTable[i]).find("tbody>tr>.batsman-cell.text-truncate.out a");

        for (let j = 0; j < singleInBat.length; j++) {
            let name = selectorTool(singleInBat[j]).text();

            let link = selectorTool(singleInBat[j]).attr("href");

            printBirthday(link, name);
        }
        console.log("```````````````````````````````````");
    }

}

function printBirthday(link, name) {
    
    request(link, cb);

    function cb(error, response, html) {
            if (error) {
                console.log(error);
            } else {
                extractBirthday(html, name);
            }
        }
}

function extractBirthday(html, name){
    let selectorTool = cheerio.load(html);
    let birthdayElem = selectorTool(".ciPlayerinformationtxt span");

    let birthday = selectorTool(birthdayElem[1]).text();
    console.log(name, " was born on ", birthday);
    console.log("\n");
}
    
    
