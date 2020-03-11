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
            if (err) console.log("There has been an error with writing to the database. Please ensure that mongodb is running.");
            cb(result);
        }
    );
}

const readStories = (db, cb) => {
    const collection = db.collection(MONGO_COLLECTION);
    collection.findOne({}, (err, result) => {
        if (err) console.log("There has been an error with reading from the database. Please ensure that mongodb is running.");
        console.log(result);
        cb(result);
    })
}

const writeToStorage = (storiesData) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) console.log("There has been an error with connecting to the database. Please ensure that mongodb is running");

        const db = client.db(MONGO_DB);

        insertStories(storiesData, db, () => {
            client.close();
        });
    });
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) console.log("There has been an error with connecting to the database. Please ensure that mongodb is running");

        const db = client.db(MONGO_DB);
        readStories(db, () => {
            client.close();
        });
    });
}

module.exports = writeToStorage;
