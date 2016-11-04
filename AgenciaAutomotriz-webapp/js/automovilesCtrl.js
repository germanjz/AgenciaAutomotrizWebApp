app.controller('automovilesCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.setActive("mAutomovil");

	$scope.automoviles = {};
	$scope.posicion = 5;
	$scope.mostrarSpinner = true;

	$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/listar')
		.success(function(data) {
			$scope.mostrarSpinner = false;
			//console.log(data);
			$scope.automoviles = data.listaAutomoviles;
		}
	);
	
	$scope.siguientes = function() {
		if ($scope.automoviles.length > $scope.posicion) {
			$scope.posicion += 5;
		}
	}

	$scope.anteriores = function() {
		if ($scope.posicion > 5) {
			$scope.posicion -= 5;
		}
	}

}]);