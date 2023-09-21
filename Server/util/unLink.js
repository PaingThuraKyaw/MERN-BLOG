const fs = require("fs");

exports.unLink = (fileName) => {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log("unlink!");
  });
};
