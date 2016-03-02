/*
 * GET login page.
 */
 var models = require('../models');

 exports.view = function(req, res){
 	res.render('login');
 };

 exports.checkCredentials = function(req, res){
 	var email = req.body.email;
 	var pwd = req.body.pwd;

 	models.User
 	.find({
 		"email": email
 	})
 	.exec(function (err, user){
 		if (user.length == 0) {
 			res.render('login', { "error": "Incorrect email" });
 			return;
 		}
 		if (user[0].password == pwd) {
 			req.session.user = user[0]._id;
 			var random_num = Math.random();
 			console.log(random_num);

 			if (random_num > 0.5) {
 				req.session.progress = true;
 			}
 			else
 				req.session.progress = false;
 			
 			console.log(req.session.user);
 			res.redirect('home');
 			return;
 		}
 		res.render('login', { "error": "Incorrect password" });
 	});
	/*for (idx in accounts) {
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
	res.render('login',data);*/
};