angularFormsApp.controller('HomeController',
	function($scope, $location, $uibModal, DataService){

		$scope.showCreateEmployeeForm = function(){
			$location.path('/newEmployeeForm');
		};

		$scope.showUpdateEmployeeForm = function(id){
			$location.path('/updateEmployeeForm/' + id);
		};

		$scope.showModalEmployeeForm = function(){
			$uibModal.open({
				templateUrl: 'app/EmployeeForm/efModalTemplate.html',
				controller: 'efModalController',
				size: 'lg'
			});
		};


	});