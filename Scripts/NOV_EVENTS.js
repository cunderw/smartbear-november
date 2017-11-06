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
      // check if we have the file path we want
      if(!aqFileSystem.Exists(Project.Path + "testResults\\")) {
        aqFileSystem.CreateFolder(Project.Path + "testResults\\");
      }
      if(!Project.Variables.VariableExists("ENABLED_COUNT")) {
        Project.Variables.AddVariable("ENABLED_COUNT", "Integer");
        Project.Variables.ENABLED_COUNT = NOV_UTILITIES.getNumEnabledTests(Project.TestItems);
      }
      if(!Project.Variables.VariableExists("RUN_COUNT")) {
        Project.Variables.AddVariable("RUN_COUNT", "Integer");
        Project.Variables.RUN_COUNT = 0;
      }
      if(Project.TestItems.Current != undefined) {
        Indicator.PushText(Project.TestItems.Current.Name);
      }
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
  // cleanup our files
  if(aqFileSystem.Exists(Project.Path + "testResults\\")) {  
    aqFileSystem.DeleteFolder(Project.Path + "testResults\\",true);    
  }
  Project.Variables.RUN_COUNT++;
  if(Project.Variables.RUN_COUNT == Project.Variables.ENABLED_COUNT) {
    Log.Message("All tests have ran. Exporting logs.");
    NOV_UTILITIES.exportLogs(Project.Path + Math.round(Math.random() * (999 - 1) + 1) + "\\");
    Project.Variables.RemoveVariable("RUN_COUNT");
    Project.Variables.RemoveVariable("ENABLED_COUNT");
  }
  Indicator.Clear();
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
  // add code here to send an email on an error
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