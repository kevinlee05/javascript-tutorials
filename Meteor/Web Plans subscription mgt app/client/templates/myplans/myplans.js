Template.myplans.helpers({
	userplans: function (){
		return Subscribers.find({user_id:Meteor.userId()});
	}
})

Template.myplans.events({
	'click .cancel-plan': function(event){
		if(confirm("are you sure?")){
			Subscribers.remove(this._id);
			toastr.success('Unsubscribed!');
			return false;
		}
		return false;		
	}
})