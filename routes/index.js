var express = require("express");
var router = express.Router();
const axios = require("axios");
const ArrayCleaner = require("../functions/arrayCleaner");
const CalculateBearish = require("../functions/bearish");
const HighestTradeVolume = require("../functions/tradevolume");
const TimeMachine = require("../functions/timeMachine");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Bitcoin Query App - MVP" });
});

router.get("/api/bitcoin", function (req, res, next) {
  let startDateUNIX = new Date(req.query.startdate).getTime() / 1000;
  let endDateUnix = new Date(req.query.enddate).getTime() / 1000;
  endDateUnix += 86399; // Add 24 * 60 * 60 -1 seconds to UTC 00:00:00

  const config = {
    headers: { "Content-type": "application/json" },
  };

  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=" +
        startDateUNIX +
        "&to=" +
        endDateUnix,
      config
    )
    .then((response) => {
      let priceArray = ArrayCleaner(
        response.data.prices,
        endDateUnix - startDateUNIX
      );

      let volumeArray = ArrayCleaner(
        response.data.total_volumes,
        endDateUnix - startDateUNIX
      );

      res.render("results", {
        startingdate: req.query.startdate,
        endingdate: req.query.enddate,
        longestBearish: CalculateBearish(priceArray),
        highestVolume: HighestTradeVolume(volumeArray),
        timeMachine: TimeMachine(priceArray),
      });
    })

    .catch((err) => {
      res.render("error", { errorMessage: "ERROR! " + err });
    });
});

module.exports = router;
