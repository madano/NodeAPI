/**
 * Created by Adam on 12/20/2015.
 */
/**
 * Created by Adam on 12/20/2015.
 */
var express = require('express');
var pool = require('../bin/database');
var md5 = require('md5');
var mysql = require('mysql');

var auth = require('./auth.js');
var addPost = {
    addTwitterPost: function(req, res, next){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var query = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
            var table = ["twitter_posts","user_id","post_id","coins",req.body.userId, req.body.postId, req.body.coins];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                connection.release();
                if(err) {
                    res.json({"Error" : true, "Message" : err});
                }
                else {
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

module.exports = addPost;