angularFormsApp.controller('efModalController', ['$scope', '$window', '$routeParams', '$uibModalInstance','DataService', 
	function($scope, $window, $routeParams, $uibModalInstance, DataService){
		if($routeParams.id)
			$scope.employee = DataService.getEmployee($routeParams.id);
		else 
			$scope.employee = { id: 0};

		$scope.editableEmployee = angular.copy($scope.employee);

		$scope.departments = [
			"Engineering",
			"Marketing",
			"Finance",
			"Administration"
		];

		$scope.submitForm = function() {

			if($scope.editableEmployee.id == 0){
				DataService.insertEmployee($scope.editableEmployee);
			}
			else{
				DataService.updateEmployee($scope.editableEmployee);
			}

			$scope.employee = angular.copy($scope.editableEmployee);
			// $window.history.back();
			$uibModalInstance.close();
		}

		$scope.cancelForm = function() {
			// $window.history.back();
			$uibModalInstance.dismiss();
		}
}])