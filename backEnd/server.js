var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var contactMeModule = require('./emailForms/contactMe.js');
var freeConsultModule = require('./emailForms/freeConsult.js');
var healthHistoryModule = require('./emailForms/healthHistory.js');

app.post('/contact-me', function(req, res) {
    contactMeModule.contactMe(req, res);
});

app.post('/free-consultation', function(req, res) {
    freeConsultModule.freeConsultation(req, res);
});

app.post('/health-history', function(req, res) {
    healthHistoryModule.healthHistoryMen(req, res);
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Take Charge Health listening at http://%s:%s", host, port);

});