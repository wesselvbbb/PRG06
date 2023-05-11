const express = require("express");
const app = express();
const bodyParser = require('body-parser');

require("dotenv").config();

app.use(bodyParser.json());

console.log(process.env.BASE_URI);
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/cars";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"))

const carsRouter = require("./routers/carsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/cars/', carsRouter);

app.listen(8000, () => {
  console.log('Running...')
})