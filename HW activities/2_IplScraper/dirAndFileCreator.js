let path = require("path");
let fs = require("fs");

// this function takes team name as a parameter and check if the path exists otherwise makes a folder
function teamNameDirectoryCreator(folderPath, team){
    let pathofDirectory = path.join(folderPath, team);
    if(fs.existsSync(pathofDirectory) == false) {
        fs.mkdirSync(pathofDirectory);
    }
    return pathofDirectory;
}

function jsonFileCreator(team, player){
    let jsonFilePath = path.join(team, player + ".json");
    if(fs.existsSync(jsonFilePath) == false){
        let file = fs.createWriteStream(jsonFilePath);
        file.end();
    }
    return jsonFilePath;
}

var createIPLFolder = (function (){
    let folderName = "IPL 2020";
    let folderPath = path.join(__dirname, folderName);
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
    return folderPath;
})();

module.exports = {
    createIPLFolder : createIPLFolder,
    dirCreator : teamNameDirectoryCreator,
    jsonFileCreator :   jsonFileCreator
}