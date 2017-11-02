/**
 * @ignore
 */
const NOV_UTILITIES = require("NOV_UTILITIES");

/**
 * we assume environment is not set every time tests are started.
 * This will allow us to set it again in the event we get an uncaught exception
 */
var environmentSet = false;

/**
 * NOV_EVENTS - Handles the on start event of each test item
 * @function
 * @author [CBU]
 * @param {object} Sender - The Built In Test Complete sender object for the event handler
 */
function startNotePadTest(Sender) {
  NOV_UTILITIES.indentLog("Test Start");
  try {
  if(!environmentSet) {
    NOV_UTILITIES.setUpEnvironment();
  }
  } catch(err) {
    Log.Error("FATAL: Error occured starting the test. See additional information", err.message + "\n" + err.stack);
  } finally {
    NOV_UTILITIES.outdentLog();
  }
}

/**
 * NOV_EVENTS - Handles the on stop event of each test item
 * @function
 * @author [CBU]
 * @param {object} Sender - The Built In Test Complete sender object for the event handler
 */
function stopNotePadTest(Sender) {
  NOV_UTILITIES.indentLog("Test Stop");
  NOV_UTILITIES.outdentLog();
}

/**
 * NOV_EVENTS - Handles the on error event
 * @function
 * @author [CBU]
 * @param {object} Sender - The Built In Test Complete sender object for the event handler
 * @param {object} LogParams - The Built In Test Complete log paramters object for attribute manipulation
 */
function onLogError(Sender, LogParams) {

}

function onLogWarning(Sender, LogParams) {

}

function onLogMessage(Sender, LogParams) {

}

function onTimeout(Sender, Params) {

}

function onOverlappingWindow(Sender, Window, OverlappingWindow, LogParams) {

}

function onUnexpectedWindow(Sender, Window, LogParams) {

}