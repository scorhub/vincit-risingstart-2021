// Return longest array(s)
function longest_arrays(arrayOfArrays) {
  var max = arrayOfArrays[0].length;
  arrayOfArrays.map((arr) => (max = Math.max(max, arr.length)));
  result = arrayOfArrays.filter((arr) => arr.length == max);
  return result;
}

// Check longest bearish trend from given date range
const CalculateBearish = (array) => {
  let bearishList = [];

  array.map((obj) => {
    if (bearishList.length === 0) {
      bearishList.push(new Array(obj));
    } else if (
      obj.value <
      bearishList[bearishList.length - 1][
        bearishList[bearishList.length - 1].length - 1
      ].value
    ) {
      bearishList[bearishList.length - 1].push(obj);
    } else {
      bearishList.push(new Array(obj));
    }
  });

  let longestBearish = [];
  longest_arrays(bearishList).map((arr) => {
    longestBearish.push(
      new Object({
        length: arr.length,
        starting: arr[0].date,
        ending: arr[arr.length - 1].date,
      })
    );
  });
  return longestBearish;
};

module.exports = CalculateBearish;
