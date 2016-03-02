/*
 * GET home page.
 */
 var models = require('../models');

 exports.view = function(req, res){
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

 	res.render('submit');
 };

 exports.addNew = function(req, res) {
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

 	var user = req.session.user;
 	var proj = new models.Project({
 		"title": req.body.title,
 		"author": user.name,
 		"description": req.body.description,
 		"projectURL": req.body.projectURL,
 		"imageURL": "http://lorempixel.com/500/500/people/",
 		"criteria": [req.body.criterion1, req.body.criterion2, req.body.criterion3, req.body.criterion4],
 		"ratings": []
 	});

 	proj.save(function(err) {
 		if(err) console.log(err);

 		console.log("new project added");

 		models.User
 		  .update(
 			  { _id: user._id },
 			  { $push: { projects: proj } }
 			);

 		res.redirect("/rate/" + proj._id);
 	});
 }