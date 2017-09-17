Meteor.startup(function(){
	if( Meteor.users.find().count() == 0){
		Accounts.createUser({
			email: 'admin@admin.com',
			username: 'admin@admin.com',
			password: 'password'
		})
	}
})