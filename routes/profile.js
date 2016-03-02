/*
 * GET profile page.
 */
 var models = require('../models');

 exports.view = function(req, res){
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

 	//console.log(req.session.user);
 	models.User
 	  .findOne({"_id": req.session.user})
 	  .populate({
 	  	path: 'projects ratings',
 	  	populate: {path: 'project', model: 'Project'}
 	  })
 	  .exec(function (err, user) {
 		  if (err) console.log(err);
 		  console.log(user);
 		  res.render('profile',user);
 	  });
 };