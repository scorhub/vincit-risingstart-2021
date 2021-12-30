const CurrencyConverter = require("./currencyConverter");

const TimeMachine = (array) => {
  let emptyObject = {
    buydate: "",
    buyprice: 0,
    selldate: "",
    sellprice: 0,
    increment: 0,
  };
  let response = { ...emptyObject };
  let buySpot = { ...emptyObject };
  let tempArray = array;

  for (let i = 0; i < array.length; i++) {
    tempArray.map((obj) => {
      if (buySpot.buydate === "") {
        buySpot.buydate = obj.date;
        buySpot.buyprice = obj.value;
      } else if (obj.value > buySpot.buyprice) {
        buySpot.selldate = obj.date;
        buySpot.sellprice = obj.value;
      }
    });
    buySpot.increment = buySpot.sellprice - buySpot.buyprice;

    if (response.increment < buySpot.increment) {
      response = buySpot;
    }

    buySpot = { ...emptyObject };
    tempArray = tempArray.slice(1);
  }

  if (response.increment > 0) {
    response.buyprice = CurrencyConverter(response.buyprice);
    response.sellprice = CurrencyConverter(response.sellprice);
    response.increment = CurrencyConverter(response.increment);
  }

  return response;
};

module.exports = TimeMachine;
