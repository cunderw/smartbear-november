/**
 * @ignore
 */
const NOV_UTILITIES = require("NOV_UTILITIES");

/**
 * NOV_VERIFICATIONS - wrapper to call the verify data on our data object (easier then call object method in a KWT)
 * @function
 * @author [CBU]
 * @param {testData} data - the data to verify
 */
function verifyTestData(data) {
  NOV_UTILITIES.indentLog("Verifying Test Data");
  data.verifySavedData()
  NOV_UTILITIES.outdentLog();
  return data;
}