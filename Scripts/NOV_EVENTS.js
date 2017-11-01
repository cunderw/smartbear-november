const NOV_UTILITIES = require("NOV_UTILITIES");
var environmentSet = false;

/**
 * NOV_EVENTS - Handles the on start event of each test item
 * @function
 * @author [CBU]
 * @param {object} Sender - The Built In Test Complete sender object for the event handler
 */
function startNotePadTest(Sender) {
  NOV_UTILITIES.indentLog("Test Start");
  if(!environmentSet) {
    NOV_UTILITIES.setUpEnvironment();
  }
  NOV_UTILITIES.outdentLog();
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