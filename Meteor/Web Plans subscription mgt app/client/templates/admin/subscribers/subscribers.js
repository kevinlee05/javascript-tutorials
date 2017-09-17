Template.listsubscribers.helpers({
	subscribers: function(){
		return Subscribers.find();
	}
})

Template.listsubscribers.events({
	'click .cancel-subscription': function(event){
		if(confirm('are you sure?')){
			Subscribers.remove(this._id);
			toastr.error('Plan Canceled');
			return false;
		}
		return false;
	}
})

