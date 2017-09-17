Template.add_post.events({
	'submit .add_post_form': function(event){
		var title = event.target.title.value;
		var body = event.target.body.value;

		Posts.insert({
			title:title,
			body: body
		});

		FlashMessages.sendSuccess("Post Added!");
		Router.go('/admin/posts');

		//prevent submit
		return false;
	}
})

Template.list_posts.helpers({
	posts: function(){
		return Posts.find();
	}
})


Template.list_posts.events({
	'click .delete_post': function(event){

		if(confirm("are you sure?")){
			Posts.remove(this._id);
			FlashMessages.sendSuccess("Post Deleted!");
			return false;
		}

		//prevent submit
		return false;
	}
})

Template.edit_post.events({
	'submit .edit_post_form': function(event){
		var title = event.target.title.value;
		var body = event.target.body.value;

		Posts.update({_id: this._id},{
			$set: {
				title:title,
				body: body
			}
		});

		FlashMessages.sendSuccess("Post Added!");
		Router.go('/admin/posts');

		//prevent submit
		return false;
	}
})