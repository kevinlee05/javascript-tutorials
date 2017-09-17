angularFormsApp.controller('efController', ['$scope', '$window', '$routeParams','DataService', 
	function($scope, $window, $routeParams, DataService){
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

		$scope.shouldShowFullName = function(){
			return true;
		}

		$scope.programmingLanguages = [
			"C",
			"C++",
			"C#",
			"Java",
			"Javascript",
			"Pascal",
			"Perl",
			"PHP",
			"Python",
			"Ruby",
			"Visual Basic"
		];
		
		$scope.hoveringOver = function(value){
			$scope.overStar = value;
			$scope.percent = 100 * (value/10);
		};

		$scope.submitForm = function() {

			$scope.$broadcast('show-errors-event');

			if($scope.employeeForm.$invalid)
				return;

			if($scope.editableEmployee.id == 0){
				// insert new Employee
				DataService.insertEmployee($scope.editableEmployee);
			}
			else{
				// update employee
				DataService.updateEmployee($scope.editableEmployee);
			}

			$scope.employee = angular.copy($scope.editableEmployee);
			$window.history.back();
		}

		$scope.cancelForm = function() {
			$window.history.back();
		}

		$scope.resetForm = function() {
			$scope.$broadcast('hide-errors-event');
		}



}])