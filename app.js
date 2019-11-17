var express = require("express");
var app = express();
var path = require('path');
var route = require('./routes/route');
var assert = require('assert');
const pug = require('pug');
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', __dirname, '/views');
app.use(express.static(path.join(__dirname, 'static/fonts')));
app.use(express.static(path.join(__dirname, 'static/css')));
app.use(express.static(path.join(__dirname, 'static/images')));


app.use('/', route);
app.get('/', function(req,res){
});
app.get('*', function(req, res){
    res.send("Error 404")
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})
module.exports = app;
