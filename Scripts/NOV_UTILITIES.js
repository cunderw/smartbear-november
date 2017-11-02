///////////////////////////////////////////////
// log utilities
//////////////////////////////////////////////
/**
 * location of the config path for our app
 * @type {object{
 * @property {string} test
 * @property {string} dev
 */
const configFilePaths = {
  test : "C:\\Users\\cunderwoo6\\Desktop\\NovemberWebinar\\Utilities\\NOV_ENV_TEST.JSON",
  dev : "C:\\Users\\cunderwoo6\\Desktop\\NovemberWebinar\\Utilities\\NOV_ENV_DEV.JSON"
}  

/**
 * NOV_UTILITIES - adds a new log folder and indents all further actions
 * @function
 * @author [CBU]
 * @param {string} sMessage -the message for the folder
 */
function indentLog(sMessage) {
  var oAttr;
  oAttr = Log.CreateNewAttributes();
  oAttr.Bold = true;
  STEP_ID = Log.CreateFolder(sMessage, "", pmNormal, oAttr);
  Log.PushLogFolder(STEP_ID);
}

/**
 * NOV_UTILITIES - Closes the last log indention
 * @function
 * @author [CBU]
 * @param {string} [sMessage=Finished] -the finished message
 */
function outdentLog(sMessage) {
  if(sMessage == undefined || sMessage == null) {
    sMessage = "Finished";
  }
  Log.Message(sMessage);
  Log.PopLogFolder();
}

/**
 * NOV_UTILITIES - Takes an object and logs all of its props and vals in an table
 * @function
 * @author [CBU]
 * @param {object} obj -the object you want to log info for
 * @param {string} [msg=See Additional Info For Object Details] - an optional message for the log
 */
function logObject(obj, msg) {
  var attr = Log.CreateNewAttributes(),
    str = '<table style="width:75%;"><tr><th>Property</th><th>Value</th></tr>';
  attr.ExtendedMessageAsPlainText = false;
  try {
    for(var key in obj) {
      str += '<tr><td>' + key + "</td><td>" + obj[key] + "</td><tr>";
    }
  } catch(err) {
    Log.Message(err);
  } finally {
    str += '</table>'
    if(!msg) {
      Log.Message("See Additional Info For Object Details", str, 300, attr);
    } else {
      Log.Message(msg, str, 300, attr);
    }
  }
}

///////////////////////////////////////////////
// environment utilities
//////////////////////////////////////////////
/**
 * NOV_UTILITIES - Gets the environment we are currently running on
 * @function
 * @author [CBU]
 * @return {string} currEnv - the environemtn we are running on, if not specifed we assume test
 */
function getEnv() {
  indentLog("Getting Environment");
  let currEnv = ""
  if(aqEnvironment.GetEnvironmentVariable("NOV_ENV") == "") {
    Log.Warning("No Envionrment Set. Assuming Test");
    dotNET.System.Environment.SetEnvironmentVariable_2("NOV_ENV", "test", dotNET.System.EnvironmentVariableTarget.User);
    currEnv = "test";
  } else {
    currEnv = aqEnvironment.GetEnvironmentVariable("NOV_ENV");
  }  
  outdentLog("Current Environment: " + currEnv);
  return currEnv;
}
 
/**
 * NOV_UTILITIES - Sets up our environment to run tests
 * @function
 * @author [CBU]
 */
function setUpEnvironment() {
  indentLog("Setting Up The Environment");
  try {    
    const configData = JSON.parse(aqFile.ReadWholeTextFile(configFilePaths[getEnv()],aqFile.ctUTF8));
    logObject(configData, "See additional information for config");
  
    // check existance of project vars we need before setting them
    if(!Project.Variables.VariableExists("APP_PATH")) {
      Project.Variables.AddVariable("APP_PATH", "String");
    }
    if(!Project.Variables.VariableExists("APP_PROCESS")) {
      Project.Variables.AddVariable("APP_PROCESS", "String");
    }
    if(!Project.Variables.VariableExists("APP_MAIN_WND_CLASS")) {
      Project.Variables.AddVariable("APP_MAIN_WND_CLASS", "String");
    }
    if(!Project.Variables.VariableExists("APP_EDIT_WND_CLASS")) {
      Project.Variables.AddVariable("APP_EDIT_WND_CLASS", "String");
    }
    if(!Project.Variables.VariableExists("APP_DATASOURCE")) {
      Project.Variables.AddVariable("APP_DATASOURCE", "String");
    }
    // sets the path of the application for the tested app
    TestedApps.Items(0).Path = configData.path;
    TestedApps.Items(0).FileName = configData.file;

    // sets project vars need to identify the application
    Project.Variables.APP_PATH = configData.path;
    Project.Variables.APP_PROCESS = configData.proccess;
    Project.Variables.APP_MAIN_WND_CLASS = configData.mainWndClass;
    Project.Variables.APP_EDIT_WND_CLASS = configData.mainEditClass;
    Project.Variables.APP_DATASOURCE = configData.dataSource;
  } catch(err) {
    Log.Error("FATAL: Error occured setting the environment. See additional information", err.message + "\n" + err.stack);
    outdentLog();  
    
  } finally {
    outdentLog();    
  }  
}

module.exports.indentLog = indentLog;
module.exports.outdentLog = outdentLog;
module.exports.logObject = logObject;
module.exports.setUpEnvironment = setUpEnvironment;