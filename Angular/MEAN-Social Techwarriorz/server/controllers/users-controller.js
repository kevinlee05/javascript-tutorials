var Users = require('../datasets/users');

module.exports.getUsers = function(req, res, next){
	Users.find({}, function(err, usersData){
		if(err){
			res.error(err);
		} else {
			res.json(usersData);
		}
	})
}

module.exports.followUser = function(req, res, next){
	var userId = req.body.userId,
		wasterId = req.body.wasterId;
		
	Users.findById(wasterId, function(err, waster){
		// need to implement check if already followed
		waster.followers.push({userId: userId});
		waster.save();
	})
	
	Users.findById(userId, function(err, follower){
		// need to implement check if already following
		follower.following.push({userId: wasterId});
		follower.save();
	})
}