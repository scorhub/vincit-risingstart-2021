const CurrencyConverter = (currency) => {
  currency = (Math.round(currency * 100) / 100).toLocaleString("en-FI", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code",
  });
  return currency;
};

module.exports = CurrencyConverter;
