Template.login.events({
	'submit .login-user': function(event){
		console.log('submit triggered');
		var username = event.target.username.value;
		var password = event.target.password.value;

		Meteor.loginWithPassword(username, password, function(err){
			if(err){
				event.target.username.value = username;
				event.target.password.value = password;
				console.log(err.reason);
				FlashMessages.sendError(err.reason);
			} else {
				console.log('login success');
				FlashMessages.sendSuccess('You are now logged in!');
				Router.go('/admin/projects');
			}
		
			
		});

		event.target.username.value = '';
		event.target.password.value = '';

		return false;
	}
})

Template.layout.events({
	'click .logout-user': function(event){
		Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
			} else {
				FlashMessages.sendSuccess('logged out!');
				Router.go('/');
			}
		});

		//Prevent Submit
		return false;
	}
})

Template.work.helpers({
	projects: function(){
		return Projects.find();
	}
})

Template.registerHelper('formatDate', function(date){
	return moment(date).format('MMMM Do YYYY, h:mm:ss a')
})

Template.registerHelper('getSiteTitle', function(){
	return 'CodeFolio';
})

Template.registerHelper('getAdminName', function(){
	return 'Mr Admin Lee';
})

Template.registerHelper('getAdminImage', function(){
	return 'assets/img/user.png';
})