let request = require("request");
let allMatchesObj = require("./allMatches");

(function () {
  let allMatchResultsPageUrl =
    "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
  request(allMatchResultsPageUrl, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      allMatchesObj.allMatches(html);
    }
  });
})();
