var express = require('express');
var pool = require('../bin/database');
var md5 = require('md5');
var mysql = require('mysql');

var auth = require('./auth.js');
var registerUsers = {
    addUserWithTwitter: function(req, res, next){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var query = "INSERT INTO ??(??, ??) VALUES (?, ?)";
            var table = ["users","twitter_id","registered_with",req.body.twitterId, "twitter"];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : err});
                } else {
                    console.log(rows.insertId);
                    connection.release();
                    res.json({"Rows" : rows});
                }
            });

            connection.on('error', function(err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
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
            connection.release();
            if(err) {
                res.json({"Error" : true, "Message" : err});
            } else {
                res.json({"Rows" : rows});
            }
        });

        connection.on('error', function(err) {
            connection.release();
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

module.exports = registerUsers;
