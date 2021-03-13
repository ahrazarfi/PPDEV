let fs = require("fs");
let input = process.argv.slice(2);
let path = input[0];

// node js fs module -> function
function isFileorNot(dirpath) {
    //check extension
    return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath) {
    //content
    return fs.readdirSync(dirpath);
}

function viewFlat(dirpath) {
    let isFile = isFileorNot(dirpath);
    if (isFile == true) {
        console.log(dirpath + "*");
    } else {
        console.log(dirpath);
        //recursion
        let content = getContent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childPath = dirpath + "/" + content[i];
            viewFlat(childPath);
        }
    }
}

// function viewTree(dirpath, indent) {
//     let isFile = isFileorNot(dirpath);
//     if(isFile == true){
//         let stArr = dirpath.split("\\");
//         let toPrint = stArr.pop();
//         console.log(indent, toPrint + "*");
//     } else {
//         let stArr = dirpath.split("\\");
//         let toPrint = stArr.pop();
//         console.log(indent, toPrint);
//         // recursion
//         let content = getContent(dirpath);
//         // console.log(content);
//         for(let i =0; i< content.length; i++){
//             let childPath = dirpath + "\\" + content[i];
//             viewTree(childPath, indent + "\t");
//         }
//     }
// }

// viewTree(path, "");
viewFlat(path);