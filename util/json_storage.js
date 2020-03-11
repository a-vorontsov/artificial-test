"use strict";
const fs = require("fs");
const format = require("date-fns/format");

const writeToStorage = (storiesData) => {
    fs.writeFile(`${format(Date.now(), "yy_MM_dd")}_hacker_news_stories.json`, JSON.stringify(storiesData, null, 2), (err) => {
        if (err) console.log("There has been an error with writing to the file.");
    });
}

module.exports = writeToStorage;
