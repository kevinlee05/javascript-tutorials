var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');


module.exports.updatePhoto = function(req, res, next){
	var file = req.files.file;
	var userId = req.body.userId;

	console.log("User " + userId + " is submitting ", file);
	var uploadDate = new Date();
	uploadDate = uploadDate.toString();
	uploadDate = uploadDate.replace(".", "");
	uploadDate = uploadDate.replace("-", "");
	uploadDate = uploadDate.replace(":", "");

	var tempPath = file.path;		
	var savePath = "/uploads/" + userId + "-" + uploadDate + "-" + file.name;
	var targetPath = path.join(__dirname, "../.." + savePath);

	fs.rename(tempPath, targetPath, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("file moved");
			User.findById(userId, function(err, userData){
				var user = userData;
				user.image = savePath;
				user.save(function(err){
					if(err){
						console.log("failed save");
						res.json({status: 500});
					} else {
						console.log('save successful');
						res.json({status: 200});
					}
				})
			})
		}

	})
}

module.exports.updateUsername = function(req, res, next){
	var username = req.body.username;
	var userId = req.body.userId;

	User.findById(userId, function (err, userData){
		var user = userData;
		user.username = username;

		user.save(function(err){
			if(err){
				console.log('failed to update user');
				res.json({status: 500});
			} else {
				console.log("success");
				res.json({status: 200});
			}
		})

	})
}

module.exports.updateBio = function(req, res, next){
	var userbio = req.body.userbio;
	var userId = req.body.userId;

	User.findById(userId, function (err, userData){
		var user = userData;
		user.userbio = userbio;

		user.save(function(err){
			if(err){
				console.log('failed to update user');
				res.json({status: 500});
			} else {
				console.log("success");
				res.json({status: 200});
			}
		})

	})
}

