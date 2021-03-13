let request = require("request");
console.log("Before");
request("https://www.google.com", cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {        
        console.log(html);
    }
}
console.log("After");