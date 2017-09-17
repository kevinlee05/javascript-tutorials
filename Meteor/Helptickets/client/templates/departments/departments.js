Template.add_departments.events({
	'submit .add-department-form': function (event) {
		var name = event.target.name.value;
		var head = event.target.head.value;
		
		Departments.insert({
			name: name,
			head: head,
			createdAt: new Date()
		})
		
		FlashMessages.sendSuccess('Department submitted');
		
		Router.go('/staff/departments');
		
		return false;

	}
});

Template.departments.events({
	'click .delete-department': function(event){
		if(confirm("are you sure?")) {
			Departments.remove(this._id);
			FlashMessages.sendSuccess('DepartmentDeleted');
			
			return false;
		}
	}	
})