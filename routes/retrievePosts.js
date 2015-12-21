/**
 * Created by Adam on 12/20/2015.
 */
var express = require('express');
var pool = require('../bin/database');
var md5 = require('md5');
var mysql = require('mysql');

var auth = require('./auth.js');
var getPosts = {
    getTwitterPosts: function(req, res, next){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            connection.query("select * from twitter_posts",function(err,rows){
                connection.release();
                if(!err) {
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

module.exports = getPosts;