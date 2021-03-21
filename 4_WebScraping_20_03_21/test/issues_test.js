// importing modules
let request = require("request");
let cheerio = require("cheerio");
let issuesObject = require("./issues");
let path = require("path");
let fs = require("fs");
let pdf = require("pdfkit");

function issues(issuesLink, topicName, repoName) {
    request(issuesLink, issuesCb);

    // callback function
    function issuesCb(error, response, html) {
        if(error){
            console.log(error);
        } else{
            extractIssues(html, topicName, repoName);
        }
    }

    // this function extracts open issues from the github issues page for the specific repo
    function extractIssues(html, topicName, repoName) {
        let sel = cheerio.load(html)
        let issuesArr = sel("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");

        let gitBaseUrl = "https://github.com";
        // let issue = [];
        // issue.push([{topicName}, {repoName}]);
        // array for open issues
        
        let pdfObj1 =  new pdf;
        pdfObj1.moveDown();
            pdfObject.text(`Topic Name: ${topicName}`, {
                align: 'center',
            });
        pdfObj1.moveDown();
            pdfObject.text(`Repository Name: ${repoName}`, {
                align: 'center',
            }); 

        for(let i=0;i<issuesArr.length;i++){
            let issueName = sel(issuesArr[i]).text();
            let issueLink = gitBaseUrl + sel(issuesArr[i]).attr("href");
/*             let issueObj = {
                // "Topic Name" : topicName,
                // "Repository Name" : repoName, 
                "Issue" : issueName,
                "Link" : issueLink
            }
            // issue.push([{topicName}, {repoName}]);
            issue.push(issueObj); */
            let pdfObject =  new pdf;
            pdfObject.moveDown();
                pdfObject.text(`Topic Name: ${topicName}`, {
                    align: 'center',
                });
            pdfObject.moveDown();
                pdfObject.text(`Repository Name: ${repoName}`, {
                    align: 'center',
                }); 
            
        }
        let pathOfFile = path.join(__dirname + "/output", topicName, repoName + ".pdf");
        // fs.writeFileSync(pathOfFile, JSON.stringify(issue));
        // console.table(issue);

/*         let pdfObject =  new pdf;
        pdfObject.moveDown();
            pdfObject.text(`Topic Name: ${topicName}`, {
                align: 'center',
            });
        pdfObject.moveDown();
            pdfObject.text(`Repository Name: ${repoName}`, {
                align: 'center',
            });  */   
        pdfObject.pipe(fs.createWriteStream(pathOfFile));
        pdfObject.text(JSON.stringify(issue, null, 5));
        pdfObject.end();
    }

}

module.exports = {
    issuesMod : issues
}