/*
 * GET home page.
 */
var models = require('../models');
var data = require('../data.json');

exports.displayResults = function(req, res){
	var query = req.query.query;
	var qRegex = new RegExp(query, 'i')

	models.Project
	  .find( { $or: [{ "title": qRegex}, {"author": qRegex}, {"description": qRegex }] } )
	  .exec(display);

	function display(err, results) {
		if (err) console.log(err);

	  res.render('search', {
	  	"query": query,
	  	"results": results
	  });
	}
};