/*
 * GET profile page.
 */
 var models = require('../models');

 exports.view = function(req, res){
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

 	console.log(req.session.user);
 	models.User
 	  .find({"_id": req.session.user._id})
 	  .populate('projects ratings')
 	  .exec(function (err, user) {
 		  if (err) console.log(err);
 		  res.render('profile',user[0]);
 	  });
 };