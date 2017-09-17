myApp.controller('RegistrationController',
	function($scope, $location, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, AuthService){
				
		$scope.login = function(){
			AuthService.$authWithPassword($scope.user)
			.then(function(authData) {
				console.log("Logged in as:", authData.uid);
				$location.path('/meetings');
			}).catch(function(error) {
				console.error("Authentication failed:", error);
				$scope.message = error.toString();
				console.log($scope.message);
			});
		}

		$scope.register = function(){
			AuthService.$createUser($scope.user)
			.then(function(userData) {
				var ref = new Firebase(FIREBASE_URL + 'users');
				var userRef = ref.child(userData.uid);
				
				var userInfo = {
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: userData.uid,
					firstname: $scope.user.firstname,
					lastname: $scope.user.lastname,
					email: $scope.user.email
				}

				userRef.set(userInfo);

				return AuthService.$authWithPassword($scope.user);
			}).then(function(authData) {
				console.log("Logged in as:", authData.uid);
				$location.path('/meetings');
			}).catch(function(error) {
				console.error("Error: ", error);
				$scope.message = error.toString();
			});

		}

});