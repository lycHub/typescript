import mysql = require('mysql');
const image = require('./tables/images');
const conf = require('../configs/mysql');
const connection = mysql.createConnection(conf);

connection.connect();
image(connection);
module.exports = connection;