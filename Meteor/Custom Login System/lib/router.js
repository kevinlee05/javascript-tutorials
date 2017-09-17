Router.configure({
	layoutTemplate: 'form_layout'
});

Router.map(function(){
	//Login-home
	this.route('login', {
		path: '/',
		template: 'login'
	});
	
	//Register
	this.route('register');
	
	this.route('dashboard', {
		layoutTemplate: 'dashboard_layout',
		path: '/dashboard',
		template: 'dashboard',
		onBeforeAction: function(){
			if(Meteor.user() == null ){
				Router.go('/');
				FlashMessages.sendError('Not Authorised. Please Log In');
			}
			this.next();
		}
	});

})