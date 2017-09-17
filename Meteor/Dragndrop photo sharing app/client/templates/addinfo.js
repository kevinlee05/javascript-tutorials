Template.addInfo.events({
	'submit .add-image-info': function(event){
		var imageId = Session.get('imageId');
		var title = event.target.title.value;
		var story = event.target.story.value;

		Meteor.call('addImageInfo', imageId, title, story);

		Modal.hide('addInfo');

		FlashMessages.sendSuccess('Image Info Added');

		return false;
	}
})