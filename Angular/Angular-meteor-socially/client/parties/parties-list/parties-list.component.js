angular.module('socially').directive('partiesList', function() {
	 return {
	  restrict: 'E',
	  templateUrl: 'client/parties/parties-list/parties-list.html',
	  controllerAs: 'partiesList',
	  controller: function($scope, $reactive) {
	    $reactive(this).attach($scope);
	    
	    this.newParty = {};
	    this.perPage = 5;
	    this.page = 1;
	    this.sort = {
	    	name: 1
	    };
	    this.orderProperty = '1';
	    this.searchText = '';
	    
	    this.map = {
	        center: {
	          latitude: 45,
	          longitude: -73
	        },
	        zoom: 8
	    };
	    
	    this.subscribe('users');
	    
	    this.subscribe('parties', () => {
	    	return [
	    		{
	    			limit: parseInt(this.perPage),
	    			skip: parseInt((this.getReactively('page') -1)* this.perPage),
	    			sort: this.getReactively('sort')
	    		},
	    		this.getReactively('searchText')
	    	]
	    }); //subscribe parties

	    this.helpers({
	      parties: () => {
	        return Parties.find({}, {sort: this.getReactively('sort')});
	      }, //parties helper
	      partiesCount: () => {
	      	return Counts.get('numberOfParties');
	      }, //partiesCount helper
	      users: () => {
	      	return Meteor.users.find({});
	      }, //users helper
	      isLoggedIn: () => {
	      	return Meteor.userId() !== null;
	      },
	      currentUserId: () => {
	      	return Meteor.userId();
	      }
	    }); //helpers
	    
	    this.addParty = () => {
	    	this.newParty.owner = Meteor.user()._id;
	    	Parties.insert(this.newParty);
	    	this.newParty = {};
	    }; //addParty
	    
	    this.removeParty = (party) => {
	    	Parties.remove({_id: party._id});
	    }; //removeParty
	    
	    this.pageChanged = (newPage) => {
	    	this.page = newPage;
	    }; //pageChanged
	    
	    this.updateSort = () => {
	    	this.sort = {
	    		name: parseInt(this.orderProperty)
	    	}
	    }; //updateSort
	    
	    this.getPartyCreator = function(party){
	    	if(!party) {
	    		return '';
	    	}
	    	
	    	let owner = Meteor.users.findOne(party.owner);
	    	
	    	if(!owner) {
	    		return 'nobody';
	    	}
	    	
	    	if (Meteor.userId() !== null && owner._id === Meteor.userId()){
	    		return 'me';
	    	}
	    	return owner;
	    };  //getPartyCreator
	    
	    this.rsvp = (partyId, rsvp) => {
	    	Meteor.call('rsvp', partyId, rsvp, (error)=>{
	    		if(error){
	    			console.log('oops unable to rsvp');
	    		} else {
	    			console.log('rsvp successfully!')
	    		}
	    	})
	    } //rsvp
	    
	    this.getUserById = (userId) => {
	    	return Meteor.users.findOne(userId);
	    } //getUserById
	    
	    this.outstandingInvitations = (party) => {
	    	return _.filter(this.users, (user) => {
	    		return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
	    	});
	    }; //outstandingInvitations
	    
	  } //controller
	} //return		
}); //module directive
