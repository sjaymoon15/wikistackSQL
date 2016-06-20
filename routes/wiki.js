var express = require("express");
var router = express.Router();

module.exports = function(models){

	router.get("/", function(req, res, next){
		res.redirect("/");
	})

	router.get("/add", function(req, res, next){
		res.render("addpage");
	})

	router.post("/", function(req, res, next){
		var newpage = models.Page.build({
			title: req.body.title,
			// urlTitle: req.body.title.trim().split(" ").join("_"),
			content: req.body.content,
			date: new Date(),
			status: req.body.status
			// userId: User.findAll({where: {name:req.body.name } });
		});
		newpage.save()
		.then(function(){
			res.redirect("/wiki/" + newpage.urlTitle); //
		});
	})

	router.get("/:urlTitle",function(req, res, next){
		// res.send("urlTitle " + req.params.urlTitle);
		models.Page.findOne({where: {urlTitle: req.params.urlTitle}})
		.then(function(foundPage){res.render("wikipage", {title: foundPage.title, content: foundPage.content})})
		.catch(next);
	}) 

	router.get("/users", function(req, res, next){

	})

	router.get("/users/:username", function(req, res, next){

	})

	router.post("/users/:username", function(req, res, next){

	})

	router.put("/users/:username", function(req, res, next){

	})

	router.delete("/users/:username", function(req, res, next){

	})
	return router;
}