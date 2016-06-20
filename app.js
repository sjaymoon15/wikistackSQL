var express = require("express");
// var routes = require("/routes");
// var Sequelize = require("sequelize");
// var db = new Sequelize("postgres://localhost:5432/wikistack");
var bodyParser = require("body-parser");
var swig = require("swig");
var pg = require("pg");
var models = require("./models");
var morgan = require("morgan");
var router = require("./routes/wiki.js");
var app = express();

app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extented : true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//
app.use("/wiki", router(models));

var server = app.listen(1337, function(){
	console.log("Listening on port: 1337");
});


models.User.sync()
	.then(function(){
		models.Page.sync()
		.then(function(){
			console.log("page and users sync");
		}).catch(function(err){
			console.error(err);
		})
	});



