Template.navbar.events({
	'click .logout-btn': function (event) {
		Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
			} else {
				FlashMessages.sendSuccess('you are logged out! Come back soon!');
				Router.go('/');
			}
		})		
	}
});