Template.image.events({
	'click .remove-image': function(event){
		if(confirm('Are You Sure?')){
			Meteor.call('deleteImage', this._id);
			FlashMessages.sendSuccess('ImageRemoved');
			return false
		}
	}
})

Template.image.helpers({
	'isOwn': function(imageId){
		var owner = ImageInfo.findOne({imageId:imageId}).userId;
		if(owner == Meteor.userId()){
			return true;
		} else {
			return false;
		}
	}
})