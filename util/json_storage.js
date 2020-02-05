"use strict";
const fs = require("fs");

const writeToStorage = (storiesData) => {
    fs.writeFile(`hacker_news_stories_${Date.now()}.json`, JSON.stringify(storiesData), (err) => {
        if (err) console.log(err);
    });
}

module.exports = writeToStorage;
