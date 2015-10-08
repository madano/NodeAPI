/**
 * Created by Adam on 8/20/2015.
 */
var mysql   = require("mysql");
var constants = require("../constants/constants");
var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : constants.HOSTNAME,
    user     : constants.USERNAME,
    password : constants.PASSWORD,
    database : constants.DBNAME,
    debug    :  false
});
module.exports = pool;