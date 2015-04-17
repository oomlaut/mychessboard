"use strict";

var fs = require('fs');
var path = require('path');
var jf = require('jsonfile');
var express = require('express');
// var http = require('http');

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
// var cookieParser = require('cookie-parser');

/*
 * Data Services
 */
var datafile = './data/data.json';
var templatefile = './data/template.json';

// TODO: Documentation
function writeDataFile(data){
    if(arguments.length === 0){
        data = require(templatefile);
    }
    // debug('writing data to file: ', data);
    jf.writeFile(datafile, data, function(err){
        return err;
    });
}

// TODO: Documentation
function outputDataFile(response){
    response.type('application/json');
    response.send(require(datafile));
}

if(!fs.existsSync(datafile)){
    // debug('file does not exist: ', datafile);
    var attempt = writeDataFile();
    if(attempt === undefined){
        console.log('fild created: ', datafile);
    } else {
        console.log(attempt);
    }
}

var app = express();
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'))
});

// Parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing Cookies
// app.use(cookieParser());

// Allow static files to be loaded
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', engines.html);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

// error handlers
//
// var logger = require('morgan');
// var debug = require('debug')('install');
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(logger('dev'));
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// TODO: Documentation
app.get('/', function(request, response) {
    response.sendFile('./public/index.html');
});

// TODO: Documentation
app.get('/data/read', function(request, response) {
    // debug('data read request');
    outputDataFile(response);
});

// TODO: Documentation
app.get('/data/reset', function(request, response){
    // debug('data reset request');
    var attempt = writeDataFile();
    if (attempt === undefined){
        outputDataFile(response);
    } else {
        console.log('data rest error', attempt);
    }
});

// TODO: Documentation
app.post('/data/store', function(request, response){
    request.accepts('application/json');
    // var json = JSON.parse(request.body);
    var attempt = writeDataFile(request.body);
    if(attempt !== undefined){
        console.log('data store error: ', attempt);
    } else {
        // debug('data stored');
        outputDataFile(response);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
