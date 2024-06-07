//Import
const {connect, connection} = require('mongoose');

//Create Database
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

//Connects Mongoose and MongoDB
connect(connectionString);

//Export
module.exports = connection;

