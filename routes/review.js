/*
 * GET home page.
 */
 var models = require("../models");
 exports.view = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

	//if (req.session.lastPage == "profile") {
		//req.session.op = "";
		models.Project
		.findOne({_id: req.params.id})
		.populate({
			path: 'ratings',
			populate: {path: 'project', model: 'Project'}
		})
		.exec(function (err, project) {
			res.render('review', {"project": project});
		});
	//}
	//else {
  //  res.render('review');
	//}
};