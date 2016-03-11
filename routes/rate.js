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
 	
 	var success = false;
 	if (req.session.success == true)
 		success = true;

 	req.session.success = false;

 	models.Project
 	.find({"_id": req.params.id})
 	.exec(display);

 	function display(err, projects) {
 		if (err) console.log(err);

 		progress = false;
 		res.render('rate', {
 			"success": success,
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
 	rating1 = rating1 == undefined ? 0 : rating1;
 	var rating2 = req.body.star1;
 	rating2 = rating2 == undefined ? 0 : rating2;
 	var rating3 = req.body.star2;
 	rating3 = rating3 == undefined ? 0 : rating3;

 	var comment = req.body.comment;
 	models.Project
 	.find({ _id: id }).
 	exec(function(err, proj) {
 		var rating = new models.Rating({
 			"project": proj[0]._id,
 			"values": [rating1, rating2, rating3],
 			"comment": comment
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
 			{ _id: req.session.user },
 			{ $push: { ratings: rating } }
 			).exec(function (err, result) {
 				if (err) console.log(err);
 				console.log(result);
 			});

 		console.log("rated");
 		req.session.success = true;
 		res.redirect("/rate/" + id);
 	});
 }