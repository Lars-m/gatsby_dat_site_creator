const path = require("path");

function getDateFromDkDate(date) {
  if (date === null) {
    return date;
  }
  const dp = date.split("-");
  if (!(dp.length === 3)) {
    return date;
  }
  return new Date(dp[2], dp[1] - 1, dp[0]);
}

function getDkStringFromDate(date) {
  //const date = new Date(d);
  let day = date.getDate();
  day = day < 10 ? `0${day}` : "" + day;
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : "" + month;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function getLastPartOfPath(folder) {
  const folderAsArray = folder.split(path.sep);
  return folderAsArray[folderAsArray.length - 1];
}

module.exports = {getLastPartOfPath,getDkStringFromDate,getDateFromDkDate }