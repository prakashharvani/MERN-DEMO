// const _ = require("lodash");
const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig");
const envConfigSetup = require('./envConfig');

envConfigSetup();

//Export config module
module.exports = {
    dbConfig,
    expressConfig
};
