/*
 * GET home page.
 */
 var models = require('../models');

 exports.displayProject = function(req, res){
 	var id = req.params.id;
	models.Project
	  .find({"_id": id})
	  .exec(display);

	function display(err, projects) {
		if (err) console.log(err);
	 	res.render('rate', projects[0]);
	}
 };

 exports.updateRating = function(req, res) {
 	console.log(req.body);
 	var id = req.params.id;

 	var rating1 = parseInt(req.body.star0);
 	var rating2 = parseInt(req.body.star1);
 	var rating3 = parseInt(req.body.star2);
 	var rating4 = parseInt(req.body.star3);
 	console.log(rating1);
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
 	console.log(rating);
 	res.redirect('rate/' + id);
 }