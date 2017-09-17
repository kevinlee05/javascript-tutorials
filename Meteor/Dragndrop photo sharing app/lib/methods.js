Meteor.methods({
	addImageInfo: function(imageId, title, story){
		if(!Meteor.userId()){
			throw new Meteor.Error('Not Authorized');
		}

		ImageInfo.insert({
			title: title,
			story: story,
			imageId: imageId,
			imageUrl: '/cfs/files/Images/'+imageId,
			userId: Meteor.userId(),
			username: Meteor.user().profile.name,
			createAt: new Date()
		});
	},
	deleteImage: function(imageId){
		if(!Meteor.userId()){
			throw new Meteor.Error('Not Authorized');
		}

		Images.remove(imageId);
		imageInfoId = ImageInfo.findOne({imageId:imageId})._id;
		ImageInfo.remove(imageInfoId);		

	}
})