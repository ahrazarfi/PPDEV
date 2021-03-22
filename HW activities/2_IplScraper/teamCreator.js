let path = require("path");
let fs = require("fs");

// this function takes team name as a parameter and check if the path exists otherwise makes a folder
function teamNameDirectoryCreator(team){
    let pathofDirectory = path.join(__dirname + "/Teams", team)
    if(fs.existsSync(pathofDirectory) == false) {
        fs.mkdirSync(pathofDirectory);
        return pathofDirectory;
    } else {
        return pathofDirectory;
    }
    
}

module.exports = {
    teamCreator : teamNameDirectoryCreator
}