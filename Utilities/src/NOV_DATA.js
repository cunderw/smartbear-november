/**
 * @ignore
 */
const NOV_UTILITIES = require("NOV_UTILITIES");

/**
 * NOV_DATA - Hold test data types and they're queries
 * @type {object}
 * @author [CBU]
 * @property {string} person - "select * from [nov$] where type = 'person'"
 * @property {string} company - "select * from [nov$] where type = 'product'"
 * @property {string} product - "select * from [nov$] where type = 'type'"
 */
const testDataTypes = {
  person: "select * from [nov$] where type = 'person'",
  company: "select * from [nov$] where type = 'company'",
  product: "select * from [nov$] where type = 'product'"
}

/**
 * NOV_DATA - Test data for use in other tests
 * @class
 * @author [CBU]
 */
class testData {
  /**
   * @param {string} firstName - the first name to type / verify
   * @param {string} lastName - the last name to type / verify
   * @param {string} message - the message to type / verify
   * @param {string} fileName - the file name to save to
   * @param {string} newMessage - the new messaage
   */
  constructor(id, type, firstName, lastName, message, fileName, newMessage) {
    /**
     * @type {number}
     */
    this.id = id;
    /**
     * @type {string}
     */
    this.type = type;
    /**
     * @type {object}
     */
    this.inputData = {
      /**
       * @type {string}
       */
      firstName: firstName == null ? "" : firstName,
      /**
       * @type {string}
       */
      lastName: lastName == null ? "" : lastName,
      /**
       * @type {string}
       */
      message: message == null ? "" : message,
      /**
       * @type {string}
       */
      newMessage: newMessage == null ? "" : newMessage
    }
    /**
     * @type {string}
     */
    this.fileName = fileName;
    /**
     * @type {string}
     */
    this.expectedResult = "";
    /**
     * @type {string}
     */
    this.fullFilePath = "";
    /**
     * @type {string}
     */
    this.fileConents = "empty";
  }
  /**
   * Verifies the saved data
   */
  verifySavedData() {
    if(!aqFile.Exists(this.fullFilePath)) {
      Log.Error(this.fullFilePath + "Not Found. Nothing To Verify");
    } else {
      this.fileContents = aqFile.ReadWholeTextFile(this.fullFilePath, aqFile.ctANSI);
      Log.Message(this.fileContents);
      Log.Message(aqFile.ReadWholeTextFile(this.fullFilePath, aqFile.ctANSI))
      aqObject.CheckProperty(this, "fileContents", cmpEqual, this.expectedResult);
    }
  }
}

/**
 * NOV_DATA - Obtains test data of a specific type
 * @function 
 * @author [CBU]
 * @param {string} type - {@link testDataTypes}
 * @return {testData} - data
 */
function getTestData(type) {
  NOV_UTILITIES.indentLog("Getting Test Data Type: " + type);
  var data;
  let ControlCn = ADO.CreateADOConnection();
  //create unique connection string with IMEX=1 to allow for mixed content columns
  try {
    ControlCn.ConnectionString = Project.Variables.APP_DATASOURCE;
    ControlCn.LoginPrompt = false;
    ControlCn.Open();
    let sql = testDataTypes[type];
    rs = ControlCn.Execute_(sql);
    if(rs.BOF) {
      Log.Error('No Data Avaliable');
      data = new testData("", "", "", "");
    } else {
      data = new testData(
        rs.Fields.Item(0)
        .Value,
        rs.Fields.Item(1)
        .Value,
        rs.Fields.Item(2)
        .Value,
        rs.Fields.Item(3)
        .Value,
        rs.Fields.Item(4)
        .Value,
        rs.Fields.Item(5)
        .Value,
        rs.Fields.Item(6)
        .Value,
      );
    }
    NOV_UTILITIES.logObject(data, "See additional information for the test data.");
    NOV_UTILITIES.logObject(data.inputData, "See additional information for the test input data.");
  } catch(err) {
    Log.Error("FATAL: Error occured getting test data. See additional information", err.message + "\n" + err.stack);
  } finally {
    NOV_UTILITIES.outdentLog();
    return data;
  }
}

function test() {
  getTestData("person")
}