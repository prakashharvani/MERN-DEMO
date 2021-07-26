'use strict';


const express = require("express"),
    bodyParser = require("body-parser"),//parses information from POST
    methodOverride = require('method-override');//used to manipulate POST
    const fileUpload = require('express-fileupload');
    const cors = require('cors')

module.exports = function (app, env) {

    app.use(cors())
    app.options('*', cors())
    // parses application/json bodies
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(fileUpload());
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));
    /**
     * add swagger to our project
     */
    // app.use('/apiDocs', express.static(app.locals.rootDir + '/api/dist'));
    app.use(function (req, res, next) {
        //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Credentials', true);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
        // "lat lng,app_version,platform,ios_version,countryISO,Authorization");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
            "app_version,platform,ios_version,countryISO,Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
        next();
    });
};
