/*
 * GET home page.
 */
var models = require('../models');
var data = require('../data.json');

exports.view = function(req, res){
	models.Project
	  .find()
	  .exec(display);

	function display(err, projects) {
		if (err) console.log(err);
		console.log(projects);
		var trending = projects.slice(0,6);
		var fresh = projects.slice(6);
	  res.render('home', {
	  	"trending": trending,
	  	"fresh": fresh
	  });
	}
};