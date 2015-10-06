/**
 * Created by Adam on 8/20/2015.
 */
var mysql   = require("mysql");
var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'restful_api_demo',
    debug    :  false
});
module.exports = pool;