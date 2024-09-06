require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouters = require('./Routers/UserRoutes')


const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;


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

// session info
app.use(session({
  secret: process.env.SESSION_KEY || 'defaultSecretKey',  // Use a default key if SESSION_KEY is not set
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: url
  })
}));


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(userRouters)