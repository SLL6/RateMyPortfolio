/*
 * GET home page.
 */
 var models = require('../models');
 var progress = false;

 exports.displayProject = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	var id = req.params.id;
 	models.Project
 	.find({"_id": id})
 	.exec(display);

 	function display(err, projects) {
 		if (err) console.log(err);

 		progress = false;
 		res.render('rate', {
 			"progress": progress,
 			"project": projects[0]
 		});
 	}
 };

 exports.displayProgress = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	var id = req.params.id;
 	models.Project
 	.find({"_id": id})
 	.populate('ratings')
 	.exec(display);

 	function display(err, projects) {
 		if (err) console.log(err);
 		progress = true;
 		res.render('rate', {
 			"progress": progress,
 			"project": projects[0]
 		});
 	}
 };

 exports.updateRating = function(req, res) {
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	var id = req.params.id;

 	var rating1 = req.body.star0;
 	var rating2 = req.body.star1;
 	var rating3 = req.body.star2;
 	var rating4 = req.body.star3;

 	var comment = req.body.comment;
 	models.Project
 	.find({ _id: id }).
 	exec(function(err, proj) {
 		var rating = new models.Rating({
 			"project": proj[0],
 			"values": [rating1, rating2, rating3],
 			"comment": comment[1]
 		});

 		rating.save(function (err){
 			if (err) console.log(err);
 			console.log(rating);
 		});

 		models.Project
 		.update(
 			{ _id: id },
 			{ $push: { ratings: rating } }
 			).exec(function (err, result) {
 				if (err) console.log(err);
 				console.log(result);
 			});

 		models.User
 		.update(
 			{ _id: req.session.user._id },
 			{ $push: { ratings: rating } }
 			).exec(function (err, result) {
 				if (err) console.log(err);
 				console.log(result);
 			});

 		console.log("rated");
 		var url = progress ? "rate2/" : "rate/";
 		res.redirect(url + id);
 	});
 }