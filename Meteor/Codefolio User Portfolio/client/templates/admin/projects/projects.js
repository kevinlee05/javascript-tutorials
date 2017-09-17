Template.layout.onRendered(function(){
	this.$('.datetimepicker').datetimepicker();
})

Template.edit_project.onRendered(function(){
	this.$('.datetimepicker').datetimepicker();
})

Template.add_project.onRendered(function(){
	this.$('.datetimepicker').datetimepicker();
})

Template.list_projects.helpers({
	projects: function(){
		return Projects.find();
	}
})

Template.list_projects.events({
	'click .delete_project': function(event){

		if(confirm("are you sure?")){
			Projects.remove(this._id);
			FlashMessages.sendSuccess("Project Deleted!");
			return false;
		}

		//prevent submit
		return false;
	}
})

Template.edit_project.events({
	'submit .edit_project_form': function(event){
		var name = event.target.name.value;
		var projectDate = event.target.projectDate.value;
		var client = event.target.client.value;
		var type = event.target.type.value;
		var description = event.target.description.value;

		var file = $('#projectImage').get(0).files[0];


		if(file){
			fsFile = new FS.File(file);
			console.log(fsFile);
			ProjectImages.insert(fsFile, function(err, result){
				if(!err){
					var projectImage = '/cfs/files/ProjectImages/' + result._id;

					// insert project
					Projects.update({
						_id: this._id
					},{
						$set: {
							name: name,
							description: description,
							type: type,
							client: client,
							projectDate: projectDate,
							projectImage: projectImage
						}
					});
				}
			});
		} else {
			// insert project
			Projects.update({
				_id: this._id
			},{
				$set: {
					name: name,
					description: description,
					type: type,
					client: client,
					projectDate: projectDate					
				}
			});
		}

		FlashMessages.sendSuccess('Project Updated');
		Router.go('/admin/projects');

		return false;
	}
});

Template.add_project.events({
	'submit .add_project_form': function(event){
		var name = event.target.name.value;
		var projectDate = event.target.projectDate.value;
		var client = event.target.client.value;
		var type = event.target.type.value;
		var description = event.target.description.value;

		var file = $('#projectImage').get(0).files[0];

		if(file){
			fsFile = new FS.File(file);
			ProjectImages.insert(fsFile, function(err, result){
				if(!err){
					var projectImage = '/cfs/files/ProjectImages/' + result._id;

					// insert project
					Projects.insert({
						name: name,
						description: description,
						type: type,
						client: client,
						projectDate: projectDate,
						projectImage: projectImage
					})
				}
			})
		} else {
			// insert project
			Projects.insert({
				name: name,
				description: description,
				type: type,
				client: client,
				projectDate: projectDate
			});
		}

		FlashMessages.sendSuccess('Project Added');
		Router.go('/admin/projects');

		return false;
	}
})