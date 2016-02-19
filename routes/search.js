/*
 * GET home page.
 */
var data = require('../data.json');

exports.displayResults = function(req, res){
	var query = req.query.query.toLowerCase();
	data["query"] = query;
	data['results'] = data['projects'].filter(function(obj) {
    return ((obj.title.toLowerCase().indexOf(query) != -1) ||
    	(obj.description.toLowerCase().indexOf(query) != -1) || 
    	(obj.author.toLowerCase().indexOf(query)!= -1));
	});
  res.render('search', data);
};