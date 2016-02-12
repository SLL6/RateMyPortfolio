/*
 * GET home page.
 */
 var projects = require('../projects.json')

 exports.displayProject = function(req, res){
 	var id = req.params.id;
 	res.render('rate',projects[id-1]);
 };

 exports.updateRating = function(req, res) {
 	var rating1 = req.body.star1;
 	var rating2 = req.body.star2;
 	var rating3 = req.body.star3;
 	var comment = req.body.comment;
 	var rating = {
 		"aesthetics": rating1,
 		"creativity": rating2,
 		"navigation": rating3,
 		"comment": comment[1]
 	};
 	console.log(req.body);
 	console.log(rating);
 	res.send(rating);
 }