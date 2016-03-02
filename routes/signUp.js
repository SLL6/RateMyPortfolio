/*
 * GET sign up page.
 */
 var models = require('../models');

 exports.view = function(req, res){
 	res.render('signUp');
 };

 exports.createAccount = function(req, res){
 	var newUser = new models.User({
 		"email": req.body.email,
 		"password": req.body.pwd,
 	});

 	models.User
 	.find({"email": req.body.email})
 	.exec( function (err, user) {
 		if (err) console.log(err);
 		if (user.length != 0) {
 			res.redirect('signUp', {"error": "Email already registered."});
 			return;
 		}
 		newUser.save(function(err) {
 			if (err) {
 				res.redirect('signUp', {"error": "Something went wrong, please try again."});
 				return;
 			}
 			req.session.user = newUser._id;
 			res.redirect('home');
 		})
 	})
	/*for (idx in accounts) {
		if (newUser['email'] == accounts[idx]['email']) {
			data['error'] = 'Email already registered';
		  res.render('signUp',data);
		  return;
		}
	}
	accounts.push(newUser);
	res.redirect('home');*/
};