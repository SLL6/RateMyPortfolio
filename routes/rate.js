/*
 * GET home page.
 */
 var models = require('../models');
 var progress = false;

 exports.displayProject = function(req, res){
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
 	var id = req.params.id;
 	models.Project
 	.find({"_id": id})
 	.exec(display);

 	function display(err, projects) {
 		if (err) console.log(err);
 		progress = true;
 		res.render('rate', {
 			"progress": true,
 			"project": projects[0]
 		});
 	}
 };

 exports.updateRating = function(req, res) {
 	var id = req.params.id;

 	var rating1 = req.body.star0;
 	var rating2 = req.body.star1;
 	var rating3 = req.body.star2;
 	var rating4 = req.body.star3;

 	var comment = req.body.comment;
 	var rating = new models.Rating({
 		"values": [rating1, rating2, rating3, rating4],
 		"comment": comment[1]
 	});

 	models.Project
 	.update(
 		{ _id: id },
 		{ $push: { ratings: rating } }
 		);

 	console.log("rated");
 	var url = progress ? "rate2/" : "rate/";
 	res.redirect(url + id);
 }