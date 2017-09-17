var Waste = require('../datasets/wastes');

module.exports.postWaste = function(req, res, next){
	var waste = new Waste(req.body);
	waste.save();
	
	Waste.find({}).sort({date: -1}).exec( function(err, allWastes){
		if(err){
			res.error(err);
		} else {
			res.json(allWastes);
		}
	})
}

module.exports.getWastes = function(req, res, next){
	console.log(req.body.following);
	if (!req.body.following) {
		console.log('retrieving all wastes no following');
		Waste.find({})
			.sort({date: -1})
			.exec( function(err, allWastes){
				if(err){
					res.error(err);
				} else {
					res.json(allWastes);
				}
			})
	} else {
		console.log('retrieving only wastes of following');
		var requestedWastes = [];
		for (var i=0, len = req.body.following.length; i < len; i++){
			requestedWastes.push({userId: req.body.following[i].userId});
		}
		Waste.find({$or: requestedWastes})
			.sort({date: -1})
			.exec(function(err, filteredWastes){
				if(err){
					res.error(err);
				} else {
					res.json(filteredWastes);				
				}
			})
	} // else loop
}