//check if staff
Template.registerHelper('isStaff', function(){
	if(Meteor.user().profile.usertype == 'staff'){
		return true;
	}
});

//format adate using moment.js
Template.registerHelper('formatDate', function(date){
	return moment(date).format('MMM Do YYYY, h:mm:ss a');
});

//capitalise first letter
Template.registerHelper('capFirst', function(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
});