var app = angular.module('agenciaAutomotrizApp',['ngRoute', 'ui.mask']);

app.controller('mainCtrl', ['$scope','$http', function($scope,$http){
	$scope.menuSuperior = "views/menu.html";
	
	$scope.setActive = function(Opcion) {
		$scope.mInicio = "";
		$scope.mAutomovil = "";
		$scope.mMotocicleta = "";

		$scope[Opcion] = "active";
	}
}]);

app.filter('formatoanio', function() {
	return function(cadena) {
		if (cadena != null && cadena.length == 4) {
			return "'" + cadena.substring(2);
		}
	}
})