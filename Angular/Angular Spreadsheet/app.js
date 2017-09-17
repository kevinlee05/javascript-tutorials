  var app = angular.module("myApp", []);
  app.controller("sheetCtrl", function($scope, $parse) {
    $scope.columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    $scope.rows = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.cells = {};
    process = function(exp) {
		return exp.replace(/[A-Z]\d+/g, function(ref) {
		return 'compute("' + ref + '")';
		});
		};
    $scope.compute = function(cell){
    	return $parse(process($scope.cells[cell]))($scope);
    };
  });