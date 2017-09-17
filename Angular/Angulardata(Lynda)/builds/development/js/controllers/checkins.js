myApp.controller('CheckInsController',  
	function($scope, $rootScope, $location, $firebase, $firebaseArray, $routeParams, AuthService, FIREBASE_URL){
	
		$scope.whichuser = $routeParams.uId;
		$scope.whichmeeting = $routeParams.mId;
		$scope.order="firstname";
		$scope.direction="";

		var checkinsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' 
			+ $scope.whichmeeting + '/checkins');
		var checkinsList = $firebaseArray(checkinsRef);
		$scope.checkins = checkinsList;

		$scope.addCheckin = function(){
			var myData = {
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				email: $scope.user.email,
				date: Firebase.ServerValue.TIMESTAMP
			};

			checkinsRef.push().set(myData, function(){
				$location.path('/checkins/' + $scope.whichuser + '/' +
					$scope.whichmeeting + '/checkinsList');
			});
		} 

		$scope.deleteCheckin = function(id){
			console.log("removing checkin with id " + id);
			checkinsRef.child(id).remove();
		}

		$scope.pickRandom = function() {
			var whichRecord = Math.round(Math.random() * checkinsList.length);
			$scope.recordId = checkinsList.$keyAt(whichRecord);
		} //pick random

		$scope.showLove = function(myItem){
			myItem.show = !myItem.show;

			if(myItem.userState == 'expanded'){
				myItem.userState = '';
			}else {
				myItem.userState = 'expanded';
			}
		}

		$scope.giveLove = function(checkin, myGift){
			var loveRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' 
			+ $scope.whichmeeting + '/checkins/' + checkin.$id + '/awards');
			var loveData = {
				name: myGift,
				date: Firebase.ServerValue.TIMESTAMP
			}
			loveRef.push().set(loveData);
		}

		$scope.deleteLove = function(checkinId, awardkey){
			var loveRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' 
			+ $scope.whichmeeting + '/checkins/' + checkinId + '/awards');

			loveRef.child(awardkey).remove();
		}

});