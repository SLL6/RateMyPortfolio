/*
 * GET home page.
 */

exports.view = function(req, res){
	req.session.user = undefined;
  res.render('index');
};