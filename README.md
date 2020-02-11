# Take Home Test for [Artificial](https://artificial.io/)
Gets top 20 stories on HackerNews and stores in a persistent storage, either JSON or mongo.

## Technologies required/used
- [mongodb](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)
- [nodejs](https://nodejs.org/en/)

## Instructions
Install dependencies:
```
npm install
```

Run with mongodb:
```
npm run mongo
```
This runs the script and adds data into database "hackerNewsStories" and document "stories". It uses a localhost mongodb instance and the default port (`27017`).
Do note that this implementation does not include user auth as no user information is being stored.

---

Run with JSON:
```
npm start
# or
npm run json
```
This runs the script and adds data into a JSON file named `hacker_news_stories_{epoch-time}.json` within the current directory.
