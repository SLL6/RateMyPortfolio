/*
 * GET home page.
 */
 var data = require('../data.json');
 var projects = data['projects'];

 exports.displayProject = function(req, res){
 	var id = req.params.id;
 	res.render('rate',projects[id-1]);
 };

 exports.updateRating = function(req, res) {
 	var id = req.params.id;
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
 	data['projects'][id-1]['ratings'].push(rating);
 	data['projects'][id-1]['success'] = true;
 	res.render('rate',projects[id-1]);
 }