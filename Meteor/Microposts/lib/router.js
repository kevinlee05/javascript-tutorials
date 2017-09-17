Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	//Posts route
	this.route('posts', {
		path: '/',
		template: 'posts'
	});
	
	this.route('about', {
		path: '/about', // not required
		template: 'about' //not required
	});
	
	this.route('profile')
});