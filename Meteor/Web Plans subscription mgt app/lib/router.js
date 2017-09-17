Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('plans',{
		path: '/',
		template: 'plans',
		data: function(){
			templateData = {
				plans: Plans.find()
			};
			return templateData;
		}		
	})
	
	this.route('listplans', {
		path: 'admin/plans',
		template: 'listplans',
		data: function(){
			templateData = {
				plans: Plans.find()
			};
			return templateData;
		}
	})

	this.route('addplan', {
		path: 'admin/plans/add',
		template: 'addplan'
	})
	
	this.route('editplan', {
		path: 'admin/plans/edit/:_id',
		template: 'editplan',
		data: function (){
			var currentPlan = this.params._id;
			return Plans.findOne({_id: currentPlan});
		}
	})

	this.route('listsubscribers', {
		path: 'admin/subscribers',
		template: 'listsubscribers'
	})

	this.route('myplans',{
		path: '/myplans',
		template: 'myplans'
	})

});