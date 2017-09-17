myApp.controller('StatusController', 
	['$scope','$rootScope','$firebaseAuth','AuthService', '$location', 'FIREBASE_URL',
	function($scope, $rootScope, $firebaseAuth, AuthService ,$location, FIREBASE_URL){

		AuthService.$onAuth(function(authData){
			if(authData){
				$scope.authData = authData;

				// retrieve user email
				$scope.userEmail = authData.password.email;
				
				//retrieve user name
				var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
				ref.on("value", function(snapshot) {
					$rootScope.currentUser = snapshot.val();
					console.log($rootScope.currentUser);
				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
				});

			}
			else{
				$scope.userEmail = null;
				$rootScope.currentUser = null;
			}

		});

		$scope.logout = function(){
			AuthService.$unauth();
			console.log("logging out");
			$location.path('/login');
		};


}])