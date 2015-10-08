var express = require('express');
var pool = require('../bin/database');
var md5 = require('md5');
var mysql = require('mysql');

var auth = require('./auth.js');
var usersTest = {
    registerFacebook: function(req, res, next){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var query = "INSERT INTO ??(??, ??) VALUES (?, ?)";
            var table = ["users","email","registered_with",req.body.email, "facebook"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : err});
                } else {
                    console.log(rows.insertId);
                    add_to_facebook_table(rows.insertId, req.body.facebookId, res, err, connection);
                    connection.release();
                    res.json({"Rows" : rows});
                    return;
                }
            });

            connection.on('error', function(err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            });
        });
    }
};

function add_to_facebook_table(user_id, facebook_id, res, err, connection) {

        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var query = "INSERT INTO ??(??, ??) VALUES (?, ?)";
        var table = ["facebook_users","user_id","facebook_id",user_id, facebook_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : err});
            } else {
                return;
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
}

function handle_database(req,res) {

  pool.getConnection(function(err,connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("select * from user_login",function(err,rows){
      connection.release();
      if(!err) {
        res.json(rows);
      }
    });

    connection.on('error', function(err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });
}

module.exports = usersTest;
