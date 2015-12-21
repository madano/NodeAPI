/**
 * Created by Adam on 12/20/2015.
 */
var express = require('express');
var pool = require('../bin/database');
var md5 = require('md5');
var mysql = require('mysql');

var auth = require('./auth.js');
var loginUser = {
    loginUserWithTwitter: function(req, res, next){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var query = "SELECT * FROM users WHERE twitter_id = ?";
            var table = [req.body.twitterId];
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

module.exports = loginUser;