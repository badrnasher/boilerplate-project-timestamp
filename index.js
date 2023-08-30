// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return res.json({ error: "Invalid Date" });
  }

  const unixTimestamp = parsedDate.getTime();
  const utcDate = parsedDate.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcDate });
});

app.get("/api/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const parsedTimestamp = new Date(parseInt(timestamp));

  if (isNaN(parsedTimestamp)) {
    return res.json({ error: "Invalid Date" });
  }

  const unixTimestamp = parsedTimestamp.getTime();
  const utcDate = parsedTimestamp.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcDate });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
