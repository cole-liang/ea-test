const axios = require("axios");

function festivalsController(requestURL) {
  function get(req, res) {
    return axios
      .get(requestURL)
      .then(response => {
        res.status(200);
        res.json(response.data);
      })
      .catch(err => {
        res.status(err.response.status);
        res.json(err.response.data);
      });
  }

  return { get };
}

module.exports = festivalsController;
