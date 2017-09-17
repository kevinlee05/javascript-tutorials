var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function(req, res, next){
	console.log(req.body);
	var user = new User(req.body);
	user.save();
	res.json(req.body);
}

module.exports.login = function(req, res, next){
	console.log('logging in');
	
	User.find(req.body, function(err, results){
		if (err) {
			console.log("error out");
		} 
		if (results && results.length === 1) {
			var userData = results[0];
			res.json({email: req.body.email,
					_id:userData._id,
					username: userData.username,
					image: userData.image,
					following: userData.following,
					followers: userData.followers
				});
		}
	})
}  