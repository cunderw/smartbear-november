///////////////////////////////////////////////
// main app utilities
//////////////////////////////////////////////

/**
 * NOV_ACTIONS - opens the application
 * @function
 * @author [CBU]
 * @param {boolean} [verify=true] - verifies that the app is open and visible
 */
function openNotePad(verify=true) {
  TestedApps.notepad.Run();
  // waits for up to ten seconds for the app to load
  Aliases.appNotead.WaitProperty("Exists",true,10000)  
  if(verify) {
    Log.Message("Verifying that Notepad is running and on screen");
    aqObject.CheckProperty(Aliases.appNotead,"Exists", cmpEqual,true);
    aqObject.CheckProperty(Aliases.appNotead.mainWindow,"Exists", cmpEqual,true);
    aqObject.CheckProperty(Aliases.appNotead.mainWindow,"VisibleOnScreen", cmpEqual,true);
  }
}

function test() {

}