/*
 * GET home page.
 */
 var projects = require('../projects.json')
 exports.displayProject = function(req, res){
 	var id = req.params.id;
 	console.log(id);
 	var proj = projects[id-1];
 	res.render('rate',proj);
 };