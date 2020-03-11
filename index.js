"use strict";
const request = require("superagent");

const writeToStorage = (process.env.DB === "mongo") ? require("./util/mongodb_storage") : require("./util/json_storage");

const getTopStoriesIds = async () => {
    try {
        const req = await request.get(`https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&limitToFirst=20`);
        return req.body;
    } catch (error) {
        console.error("Unable to get top 20 HackerNews stories. Please make sure you're connected to the internet.\nContact the developers if this error persists");
        return [];
    }
}

const getStoryData = async (storyId) => {
    try {
        const req = await request.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        return req.body;
    } catch (error) {
        console.error(`Unable to get data of story with id ${storyId}. Please make sure you're connected to the internet.\nContact the developers if this error persists`);
        return [];
    }
}

const mapStoryData = async (storiesIds) => {
    try {
        const storiesData = await Promise.all(storiesIds.map(storyId => getStoryData(storyId)));
        return storiesData;
    } catch (error) {
        console.error("Unable to map story data");
    }
}

async function main() {
    const storiesIds = await getTopStoriesIds();
    if (storiesIds.length > 0) {
        const storyData = await mapStoryData(storiesIds);
        writeToStorage(storyData);
    }
}

main();
