const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile("test.html", {root: __dirname});
  res.sendFile("index.js", {root: __dirname})
});

app.listen(port, () => {
    console.log(`Listening to: ${port}`);
});
