/*
 * GET home page.
 */
 var models = require("../models")

 exports.view = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	models.User
 	.findOne({_id: req.session.user})
 	.exec(function (err, user) {
 		res.render('settings', {"user": user});
 	});
 };

 exports.updateName = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	models.User
 	.findOne({_id: req.session.user})
 	.update({"name": req.body.name})
 	.exec(function (err, result) {
 		console.log(result);

 		if(result.n == 1) {
 			models.User
 			.findOne({_id: req.session.user})
 			.exec(function (err, user) {
 				res.render('settings', {"success": "Name updated", "user": user});
 			});
 		}
 	});
 };

 exports.changePwd = function(req, res){
 	if (req.session.user == undefined) {
 		res.redirect('login');
 		return;
 	}

 	models.User
 	.findOne({_id: req.session.user, "password": req.body.oldPwd})
 	.update({"password": req.body.newPwd})
 	.exec(function (err, result) {
 		console.log(result)

 		if(result.n == 1) {
 			models.User
 			.findOne({_id: req.session.user})
 			.exec(function (err, user) {
 				res.render('settings', {"success": "Password updated", "user": user});
 			});
 		}
 		else{
 			models.User
 			.findOne({_id: req.session.user})
 			.exec(function (err, user) {
 				res.render('settings', {"error": "Incorrect password", "user": user});
 			});
 		}
 	});
 };