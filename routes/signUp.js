/*
 * GET sign up page.
 */
var data = require('../accounts.json');
var accounts = data['accounts'];

exports.view = function(req, res){
  res.render('signUp', accounts);
};

exports.createAccount = function(req, res){
	var newUser = {
		"email": req.body.email,
		"password": req.body.pwd
	};
	for (idx in accounts) {
		if (newUser['email'] == accounts[idx]['email']) {
			data['error'] = 'Email already registered';
		  res.render('signUp',data);
		  return;
		}
	}
	accounts.push(newUser);
  res.redirect('home');
};