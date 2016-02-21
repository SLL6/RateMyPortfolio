/*
 * GET home page.
 */
 var data = require('../homeData.json');

exports.view = function(req, res){
  res.render('profile',data);
};