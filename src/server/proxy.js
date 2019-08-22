const express = require("express");
const request = require("request");
const app = express();

const requestURL =
  "http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/festivals", (req, res) => {
  request({ url: requestURL }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        type: "error",
        message: `Something wrong: ${error.message || "unknown error"}`
      });
    }
    res.json(JSON.parse(body));
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server is listening on port ${port}`));
