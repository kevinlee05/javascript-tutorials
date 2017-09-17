(function(){
	angular.module('TimeWaste')
		.controller('MainController', ['$scope', '$http', '$interval', 
							function($scope,$http, $interval){
			
			if(localStorage['User-Data'] !== undefined){
				$scope.user = JSON.parse(localStorage['User-Data']);
				console.log($scope.user);
			} else {
				console.log($scope.user);
			}

			//Init
			getWastes(true);
			
			// check for new wastes every 5 seconds
			$scope.intervalcount = 1;
			$interval(function(){
				getWastes(false);
				console.log("this is check number: " + $scope.intervalcount);
				$scope.intervalcount++;
			}, 5000);
						
			$scope.sendWaste = function($event){
				if(event.which === 13){
					var request = {
						user: $scope.user.username || $scope.user.email,
						userId: $scope.user._id,
						userImage: $scope.user.image,
						content: $scope.newWaste
					}
					
					$http.post('api/waste/post', request).success(function(response){
						console.log('fires');
						console.log(response);
						$scope.wastes = response;
					}).error(function(error){
						console.error(error);
					})
				}
			}
			
			function getWastes(initial){
				var data = {};
				
				if($scope.user){
					data.following = angular.copy($scope.user.following);
					data.following.push({userId: $scope.user._id});
					console.log(data.following);
				}
				$http.post('api/waste/get', data).success(function(response){
					if(initial){
						$scope.wastes = response;
					} else {
						if(response.length > $scope.wastes.length){
							$scope.incomingWastes = response;
							$scope.difference = $scope.incomingWastes.length - $scope.wastes.length;				
						}
					}
				}).error(function(error){
					console.error(error);
				})
			};
						
			$scope.setNewWastes = function(){
				$scope.wastes = angular.copy($scope.incomingWastes);
				$scope.incomingWastes = undefined;
			}
			
			
			
		}])
})();