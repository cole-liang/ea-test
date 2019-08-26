// This proxy server aims to avoid CORS policy problem
// Just simply request data from the remote API then pass
// it to the front-end application

const express = require("express");
const request = require("request");
// const axios = require("axios");
const app = express();

const requestURL =
  "http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals";

app.use("/festivals", function(req, res) {
  req.pipe(request(requestURL)).pipe(res);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server is listening on port ${port}`));

// // To avoid CORS policy problem
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// // Get data from the api
// app.get("/festivals", (req, res) => {
//   request(requestURL, (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//       return res.status(500).json({
//         type: "error",
//         message: `Something wrong: ${error ? error.message : "unknown error"}`
//       });
//     }
//     // console.log(body);
//     res.json(JSON.parse(body));
//   });
// });

// app.get("/festivals", (req, res) => {
//   axios
//     .get(requestURL)
//     .then(response => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
