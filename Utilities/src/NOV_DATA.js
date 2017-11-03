﻿/**
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
  company: "select * from [nov$] where type = 'product'",
  product: "select * from [nov$] where type = 'type'"
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
   */
  constructor(firstName, lastName, message, fileName) {
    /**
     * @type {string}
     */
    this.firstName = firstName;
    /**
     * @type {string}
     */
    this.lastName = lastName;
    /**
     * @type {string}
     */
    this.message = message;
    /**
     * @type {string}
     */
    this.fileName = fileName;
  }
}

/**
 * NOV_DATA - Obtains test data of a specific type
 * @function 
 * @author [CBU]
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
        rs.Fields.Item(1)
        .Value,
        rs.Fields.Item(2)
        .Value,
        rs.Fields.Item(3)
        .Value,
        rs.Fields.Item(4)
        .Value,
      );
    }
    NOV_UTILITIES.logObject(data,"See additional information for the test data.")
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