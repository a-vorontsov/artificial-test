"use strict";
const MongoClient = require("mongodb").MongoClient;

const MONGO_URL = "mongodb://localhost:27017";
const MONGO_DB = "hackerNewsStories";
const MONGO_COLLECTION = "stories";

const insertStories = (stories, db, cb) => {
    const collection = db.collection(MONGO_COLLECTION);
    collection.insertMany(
        stories,
        (err, result) => {
            if (err) throw err;
            cb(result);
        }
    );
}

const writeToStorage = (storiesData) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) throw err;

        const db = client.db(MONGO_DB);

        insertStories(storiesData, db, () => {
            client.close();
        })
    });
}

module.exports = writeToStorage;
