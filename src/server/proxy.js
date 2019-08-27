// This proxy server aims to avoid CORS policy problem
// Just simply request data from the remote API then pass
// it to the front-end application

const express = require("express");
const festivalsController = require("./festivalsController");
const app = express();

const requestURL =
  "http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals";

const controller = festivalsController(requestURL);

// Get data from the api
app.get("/festivals", controller.get);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server is listening on port ${port}`));
