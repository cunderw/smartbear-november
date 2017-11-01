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
 */
function openNotePad(verify = true) {
  NOV_UTILITIES.indentLog("Opening Notepad");
  TestedApps.notepad.Run();
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
 */
function closeNotePad(verify = true, click = true) {
  NOV_UTILITIES.indentLog("Closing Notepad");
  menuNavigation("exit", click);
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