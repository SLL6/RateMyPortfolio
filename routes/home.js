/*
 * GET home page.
 */
var models = require('../models');

exports.view = function(req, res){
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

	models.Project
	  .find()
	  .exec(display);

	function display(err, projects) {
		if (err) console.log(err);

		var ootd = Math.floor(Math.random() * projects.length); 
		console.log(ootd);

		var trending = projects.slice(0,6);
		var fresh = projects.slice(6);
	  res.render('home', {
	  	"ootd": projects[ootd],
	  	"trending": trending,
	  	"fresh": fresh
	  });
	}
};