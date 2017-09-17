myApp.factory('AuthService', ['$firebaseAuth', 'FIREBASE_URL', 
	function($firebaseAuth,FIREBASE_URL){
		var ref = new Firebase(FIREBASE_URL);
		return $firebaseAuth(ref);
		
	}
]);


myApp.run( function($rootScope, AuthService){
	
		$rootScope.globalgetauth = function (){
			return AuthService.$getAuth();
			console.log('checking authentication status');
		};

});