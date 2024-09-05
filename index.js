require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
app.use(express.json());

const port = process.env.PORT;

//DB connection
const url = process.env.MONGO_URL;
async function connect() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: url
    })
}))


server.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT || 4000}`);
});
