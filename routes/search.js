/*
 * GET home page.
 */
var data = require('../data.json');

exports.displayResults = function(req, res){
	data["query"] = req.query.query;
  res.render('search', data);
};