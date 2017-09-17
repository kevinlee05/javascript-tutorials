Template.dropzone.events({
	'dropped #dropzone': function(event){
		FS.Utility.eachFile(event, function(file){
			var newFile = new FS.File(file);
			Images.insert(newFile, function(error, result){
				if(error){
					FlashMessages.sendError('There was an issue with the upload');
				} else {
					Session.set('imageId', result._id);
					FlashMessages.sendSuccess('Image Uploaded');
					Modal.show('addInfo');
				}
			});
		})
	}
})