/*
 * GET home page.
 */
 var models = require('../models');

 exports.view = function(req, res){
 	res.render('submit');
 };

 exports.addNew = function(req, res) {
 	var proj = new models.Project({
 		"title": req.body.title,
 		"author": "No one for now",
 		"description": req.body.description,
 		"projectURL": req.body.projectURL,
 		"imageURL": "http://lorempixel.com/500/500/people/",
 		"criteria": [req.body.criterion1, req.body.criterion2, req.body.criterion3, req.body.criterion4],
 		"ratings": []
 	});

 	proj.save(function(err, proj) {
 		if(err) console.log(err);

 		console.log("new project added");
 		res.redirect("/rate/" + proj._id);
 	});
 }