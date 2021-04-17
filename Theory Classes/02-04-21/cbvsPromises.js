let fs = require("fs");
console.log("before");

// implementing promise from scratch
function promisewalareadfile(filepath) {
  // first step -> wrap it inside a Promise object

  return new Promise(function (resolve, reject) {
    fs.readFile(filepath, function cb(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

let frP = promisewalareadfile("f1.txt");
console.log(frP);
setTimeout(function () {
  console.log(frP);
}, 1000);
