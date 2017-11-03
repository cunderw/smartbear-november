///////////////////////////////////////////////
// main app utilities
//////////////////////////////////////////////
/**
 * @ignore
 */
const NOV_UTILITIES = require("NOV_UTILITIES");

/**
 * NOV_ACTIONS - opens the application
 * @function
 * @author [CBU]
 * @param {boolean} [verify=true] - verifies that the app is open and visible
 * @param {boolean} [restart=true] - Restarts the app before attempting to open
 */
function openNotePad(verify = true, restart = true) {
  NOV_UTILITIES.indentLog("Opening Notepad");
  if(restart && Aliases.appNotead.Exists) {
    Aliases.appNotead.Terminate();
  }
  TestedApps.Items(0)
    .Run();
  // waits for up to ten seconds for the app to load
  Aliases.appNotead.WaitProperty("Exists", true, 10000)
  if(verify) {
    Log.Message("Verifying that Notepad is running and on screen");
    aqObject.CheckProperty(Aliases.appNotead, "Exists", cmpEqual, true);
    aqObject.CheckProperty(Aliases.appNotead.mainWindow, "Exists", cmpEqual, true);
    aqObject.CheckProperty(Aliases.appNotead.mainWindow, "VisibleOnScreen", cmpEqual, true);
  }
  NOV_UTILITIES.outdentLog();
}

/**
 * NOV_ACTIONS - closes the application
 * @function
 * @author [CBU]
 * @param {boolean} [verify=true] - verifies that the app is open and visible
 * @param {boolean} [click=true] - uses clicks to close notepad if true, otherwises uses keyboard shortcuts
 * @param {boolean} [bypassSaveDialog=true] - if true clicks don't save if the save dialog exists
 */
function closeNotePad(verify = true, click = true, bypassSaveDialog= true) {
  NOV_UTILITIES.indentLog("Closing Notepad");
  menuNavigation("exit", click);
  if(bypassSaveDialog && Aliases.appNotead.saveDialog.Exists) {
    saveDialog("dontSave",click);
  }
  // waits for up to ten seconds for the app to load  
  if(verify) {
    Log.Message("Verifying that Notepad closed gracefully.");
    aqObject.CheckProperty(Aliases.appNotead, "Exists", cmpEqual, false);
  }
  NOV_UTILITIES.outdentLog();
}

///////////////////////////////////////////////
// navigation utilities
//////////////////////////////////////////////

/**
 * NOV_ACTIONS - Represents a navigation option for our application
 * @class
 * @author [CBU]
 */
class navOption {
  /**
   * @param {string} root - the root menu, File, Edit, etc...
   * @param {string} option - the secondary option
   * @param {string} [keys] - optional keyboard shortcut if the menu item supports it
   */
  constructor(root, option, keys) {
    /**
     * the root menu, File, Edit, etc...
     * @type {string}
     */
    this.root = root;
    /**
     * the secondary option
     * @type {string}
     */
    this.option = option;
    /**
     * optional keyboard shortcut if the menu item supports it
     * @type {string}
     */
    this.keys = keys;
    /**
     * the full combined path of. root|path
     * @type {string}
     */
    this.path = this.root + "|" + this.option;
  }
  /**
   * Performs actions on the nav option
   * @param {boolean} click - uses clicks to otherwises uses keyboard shortcuts
   */
  action(click) {
    if(click === true) {
      NOV_UTILITIES.indentLog("ACTION: Clicking Menu Path: " + this.path);
      Aliases.appNotead.mainWindow.MainMenu.Click(this.path);
      NOV_UTILITIES.outdentLog();
    } else {
      NOV_UTILITIES.indentLog("ACTION: Keys: " + this.keys);
      if(this.keys !== undefined) {
        Aliases.appNotead.mainWindow.Keys(this.keys);
      } else {
        Log.Error("Trying To Perform A Non Click Option Without Defined Keyboard Shortcuts");
      }
      NOV_UTILITIES.outdentLog();
    }
  }

}

/**
 * NOV_ACTIONS - holds nav options created by {@link navOption}
 * @type {object}
 * @author [CBU]
 * @property {navOption} exit - nav option for exiting / closing notepad
 * @property {navOption} save - nav option for saving a file
 */
const navOptions = {
  /**
   * @type {navOption}
   */
  exit: new navOption("File", "Exit"),
  save: new navOption("File", "Save")
}

/**
 * NOV_ACTIONS - performs various menu navigation options
 * @function
 * @author [CBU]
 * @param {string} option - which option to perform from {@link navOptions}
 * @param {boolean} click - uses clicks to otherwises uses keyboard shortcuts
 */
function menuNavigation(option, click) {
  NOV_UTILITIES.indentLog("Performing Menu Navigation: " + option);
  try {
    navOptions[option].action(click);
  } catch(err) {
    Log.Error("FATAL: Error occured performing menu navigation. See additional information", err.message + "\n" + err.stack);
  } finally {
    NOV_UTILITIES.outdentLog();
  }
}

/**
 * NOV_ACTIONS - inputs data from a test data object
 * @param {testData} data - the data to input / verify
 * @param {boolean} clear - if true clears the text first
 * @param {boolean} newLine - if true automatically enters a new line after each test data input
 * @param {boolean} verify - if true verifies the app accepts input properly
 */
function inputTestData(data, clear = true, newLine = true, verify = false) {
  NOV_UTILITIES.indentLog("Inputing Test Data");
  try {
    const editField = Aliases.appNotead.editField;
    // we need to check the types of clear and new line so we can convert to boolean if it's a string passed in
    // this will allow us to use the built in test complete data driven loop
    if(typeof (clear) !== "boolean") {
      clear = clear == "true";
    }
    if(typeof (clear) !== "boolean") {
      newLine = newLine == "true";
    }
    let expectedText = "";
    // check if we're clearing the text field, if not then we need to grab the current value for the expected text
    if(!clear) {
      expectedText += editField.wText;
    } else {
      editField.SetText("");
    }
    for(var key in data.inputData) {
      if(data.inputData[key] !== undefined) {
        editField.Keys(data.inputData[key]);
        expectedText += data.inputData[key];
        if(newLine) {
          editField.Keys("[Enter]");
          // new line character
          expectedText += "\r\n"
        }
      }
    }
    if(verify) {
      Log.Message("Verify that the edit field matches input");
      aqObject.CheckProperty(editField, "wText", cmpEqual, expectedText);
    }
  } catch(err) {
    Log.Error("FATAL: Error occured inputting data. See additional information", err.message + "\n" + err.stack);
  } finally {
    NOV_UTILITIES.outdentLog();
    return data;
  }
}

/**
 * NOV_ACTIONS - performs actions and verfies the save dialog existence 
 * @function
 * @author [CBU]
 * @param {string} selectOption - which option to select, save, don'tsave or cancel
 * @param {boolean} [click=true] - uses clicks to otherwises uses keyboard shortcuts. only click is supported currently
 * @param {boolean} [verifyExists] - verfies the dialog actually exists
 */
function saveDialog(selectOption, click=true, verifyExists) {
  const dialog = Aliases.appNotead.saveDialog;
  NOV_UTILITIES.indentLog("Selecting Save Dialog Option: " + selectOption);
  if(verifyExists) {
    Log.Message("Verify Save Dialog Exists");
    aqObject.CheckProperty(dialog, "Exists", cmpEqual, true);
    aqObject.CheckProperty(dialog, "VisibleOnScreen", cmpEqual, true);
  }
  switch(selectOption) {
    case "save" :
      Log.Message("Clicking Save Button");
      dialog.btnSave.Click();
      break;
    case "dontSave" :
      Log.Message("Clicking Don't Save Button");
      dialog.btnDontSave.Click();
      break;
    case "cancel" :
      Log.Message("Clicking Cancel Button");
      dialog.btnCancel.Click();
      break;
    case "none" :
      Log.Message("No Action Performed");
      break;
  }
  NOV_UTILITIES.outdentLog();
}