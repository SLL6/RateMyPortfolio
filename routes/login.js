/*
 * GET login page.
 */
var data = require('../accounts.json');
var accounts = data['accounts'];

exports.view = function(req, res){
  res.render('login',accounts);
};

exports.checkCredentials = function(req, res){
	var email = req.body.email;
	var pwd = req.body.pwd;
	console.log(accounts);
	for (idx in accounts) {
		if (email == accounts[idx]['email']) {
			if (pwd == accounts[idx]['password']) {
			  res.redirect('home');
			}
			else {
				data['error'] = 'Incorrect password';
			  res.render('login',data);
			}
		  return;
		}
	}
	data['error'] = 'Incorrect email';
  res.render('login',data);
};