/*
 * GET home page.
 */

exports.view = function(req, res){
	if (req.session.user == undefined) {
		res.redirect('login');
		return;
	}

  res.render('settings');
};