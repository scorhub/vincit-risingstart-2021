function convertTimeStamp(timestamp) {
  let date = new Date(timestamp);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  if (Number(day) < 10) {
    day = "0" + day;
  }
  if (Number(month) < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + day;
}

const ArrayCleaner = (array, length) => {
  let response = [];

  let ninetyDays = 90 * 24 * 60 * 60;

  // GoinGecko gives only one result per day, if searchrange is 90 days or more.
  // No need to loop through datechecker in that case.
  if (length >= ninetyDays) {
    array.map((data) => {
      convertedData = { date: convertTimeStamp(data[0]), value: data[1] };
      response.push(convertedData);
    });
  } else {
    array.map((data) => {
      convertedData = { date: convertTimeStamp(data[0]), value: data[1] };
      if (response.length === 0) {
        response.push(convertedData);
      } else if (response[response.length - 1].date < convertedData.date) {
        response.push(convertedData);
      }
    });
  }
  return response;
};

module.exports = ArrayCleaner;
