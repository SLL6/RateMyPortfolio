/*
 * GET sign up page.
 */
var data = require('../accounts.json');

exports.view = function(req, res){
  res.render('signUp', accounts);
};

exports.createAccount = function(req, res){
	var newUser = {
		"email": req.body.email,
		"password": req.body.pwd
	};
	data['accounts'].push(newUser);
  res.redirect('home');
};