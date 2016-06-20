var express = require("express");
var router = exress.Router();


router.get("/wiki", function(req, res, next){
	res.
})

router.post("/", function(req, res, next){
	Page.build({
		title: req.body.title,
		urlTitle: req.body.title.trim().split(" ").join("_");
	})
})

module.exports = {
	router:router
}