const CurrencyConverter = require("./currencyConverter");

const HighestTradeVolume = (array) => {
  let result = array.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );
  result.value = CurrencyConverter(result.value);
  return result;
};

module.exports = HighestTradeVolume;
