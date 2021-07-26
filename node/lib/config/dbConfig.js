'use strict';

const mongoose = require('mongoose');
// plugin bluebird promise in mongoose
mongoose.Promise = require('bluebird');



// Connect to Db
function connectDb(callback) {
    let dbUrl = process.env.dbUrl;
    let dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

  
        dbUrl = dbUrl + process.env.dbName;
        mongoose.set('debug', true);
 
    dbUrl = dbUrl + '?retryWrites=true&w=majority';
    console.info("connecting to -> " + dbUrl);
    mongoose.connect(dbUrl, dbOptions);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.info('connected to DB', process.env.dbName);
        callback();
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.info('DB connection error: ' + err);
        callback(err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.info('DB connection disconnected');
        callback("DB connection disconnected");
    });
}

module.exports = connectDb;
