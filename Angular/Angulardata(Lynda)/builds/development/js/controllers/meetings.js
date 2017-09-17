
myApp.controller('MeetingsController', 
	['$scope', '$rootScope', '$firebaseArray', '$firebaseObject','AuthService', 'FIREBASE_URL',
	function($scope, $rootScope, $firebaseArray, $firebaseObject, AuthService, FIREBASE_URL){
		
		var authData = AuthService.$getAuth();

		if(authData){

			var meetingsRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/meetings');
			//$scope.meetingsInfo = $firebaseArray(meetingsRef);
			
			var meetingsObj = $firebaseObject(meetingsRef);
			var meetingsArray = $firebaseArray(meetingsRef);
			$scope.meetingsArray = meetingsArray;


			meetingsObj.$loaded().then(function(data){
				$scope.meetings = meetingsObj;
			});

			// meetingsArray.$loaded().then(function(data){
			// 	$rootScope.howManyMeetings = meetingsArray.length;
			// 	console.log('retrieving number of meetings');
			// });

			meetingsArray.$watch(function(event){
				$rootScope.howManyMeetings = meetingsArray.length;
				console.log('updating number of meetings');
			});

			$scope.addMeeting = function () {
				// $scope.meetingsInfo.$add
				meetingsRef.push().set({
					name: $scope.meetingname,
					date: Firebase.ServerValue.TIMESTAMP
				}, function(){
					$scope.meetingname = '';
					console.log('adding meeting');
				})		
			}

			$scope.deleteMeeting = function (key) {
				console.log('the key is' + key);
				meetingsRef.child(key).remove();
				console.log("deleting meeting")
			};

		};

		// $scope.checkauth = function (){
		// 	return AuthService.$getAuth();
		// 	console.log('checking authentication status')
		// }

}])