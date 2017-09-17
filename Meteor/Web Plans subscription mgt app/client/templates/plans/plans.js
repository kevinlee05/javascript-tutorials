Template.plans.events({
	'click .buy-plan': function(event){
		var plan_id = event.currentTarget.id;
		var plan_name = event.currentTarget.rel;

		var plan_info = Plans.findOne({_id: plan_id});

		Subscribers.insert({
			user_id: Meteor.userId(),
			user_email: Meteor.user().emails[0].address,
			plan_name: plan_info.plan_name,
			plan_id: plan_info._id,
			plan_label: plan_info.plan_label,
			plan_duration: plan_info.days,
			plan_description: plan_info.description,
			plan_price: plan_info.price,
			join_date: new Date()			
		});

		toastr.success('Joined Plan!');

	}
})