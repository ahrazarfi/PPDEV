let fs = require("fs");

let cmd = process.argv.slice(2);

let opt = [];
let file = [];
let str = ``;

for (let i = 0; i < cmd.length; i++) {
    if (cmd[i].startsWith("-")) {
        opt.push(cmd[i]);
    } else {
        file.push(cmd[i]);
    }
}

for (let j = 0; j < file.length; j++) {
    if (fs.existsSync(file[j])) {
        str += fs.readFileSync(file[j]).toString();
    } else {
        console.log("Invalid file");
        return;
    }
}
str = str.split("\n");

if (opt.includes("-s")) {
    str = convToSinLineBreak(str);
}
if (opt.includes("-b") && opt.includes("-n")) {
    if (opt.indexOf("-n") > opt.indexOf("-b")) {
        //implementing -b
        str = addNumtoNonEmpty(str);
    } else {
        //implementing -n
        str = addNumtoAllLines(str);
    }
} else {

    if (opt.includes("-n")) {
        //implementing -n
        str = addNumtoAllLines(str);
    }
    if (opt.includes("-b")) {
        //implementing -b
        str = addNumtoNonEmpty(str);
    }
}

str = str.join("\n");

console.log(str);


function convToSinLineBreak(arr) {
    let v = [];
    let flag = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "" || arr[i] == "\r") {
            if (flag === true) {
                continue;
            } else {
                y.push(arr[i]);
                flag = true;
            }
        } else {
            y.push(arr[i]);
            flag = false;
        }
    }
    return v;
}

//-n
function addNumtoAllLines(arr) {
    for (let i = 1; i <= arr.length; i++) {
        arr[i - 1] = i + " " + arr[i - 1];
    }
    return arr;
}


//-b
function addNumtoNonEmpty(arr) {
    let numLine = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== "" && arr[i] !== "\r") {
            arr[i] = numLine + " " + arr[i];
            numLine++;
        }
    }
    return arr;
}