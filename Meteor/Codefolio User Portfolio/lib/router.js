Router.configure({
	layoutTemplate: 'layout'

});

Router.map(function(){
	this.route('home',{
		path:'/',
		template: 'home'
	})

	this.route('about');

	this.route('work', {
		path: '/work',
		template: 'work'
	});

	this.route('project',{
		path:'/project/:_id',
		template: 'project',
		data: function(){
			var projectId = this.params._id;
			return Projects.findOne({_id: projectId});
		}
	})

	this.route('contact');


	this.route('blog',{
		path:'/blog',
		template: 'blog',
		data: function(){
			templateData = {
				posts: Posts.find()
			};
			return templateData;
		}
	});

	this.route('post',{
		path:'/blog/post/:_id',
		template: 'post',
		data: function(){
			var currentPost = this.params._id;
			return Posts.findOne({_id: currentPost});
		}
	})

	this.route('list_posts',{
		path:'/admin/posts',
		template: 'list_posts'
	})

	this.route('add_post',{
		path:'/admin/posts/add',
		template: 'add_post',
		onBeforeAction: function(){
			//redirect if not logged in
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
	})

	this.route('edit_post',{
		path:'/admin/posts/:_id/edit',
		template: 'edit_post',
		data: function(){
			var currentPost = this.params._id;
			return Posts.findOne({_id: currentPost});
		},
		onBeforeAction: function(){
			//redirect if not logged in
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
	})

	this.route('list_projects',{
		path:'/admin/projects',
		template: 'list_projects'
	})

	this.route('add_project',{
		path:'/admin/projects/add',
		template: 'add_project',
		onBeforeAction: function(){
			//redirect if not logged in
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
	})

	this.route('edit_project',{
		path:'/admin/projects/:_id/edit',
		template: 'edit_project',
		data: function(){
			var currentProject = this.params._id;
			return Projects.findOne({_id: currentProject});
		},
		onBeforeAction: function(){
			//redirect if not logged in
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
	})

	this.route('login',{
		path:'/admin',
		template: 'login'
	})

})