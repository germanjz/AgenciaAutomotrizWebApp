app.controller('marcasAutomovilCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.setActive("mAutomovil");

	$scope.marcas = {};
	$scope.posicion = 5;
	$scope.mostrarSpinner = true;

	$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/marca/listar')
		.success(function(data) {
			$scope.mostrarSpinner = false;
			//console.log(data);
			$scope.marcas = data.listaMarcas;
		}
	);
	
	$scope.siguientes = function() {
		if ($scope.marcas.length > $scope.posicion) {
			$scope.posicion += 5;
		}
	}

	$scope.anteriores = function() {
		if ($scope.posicion > 5) {
			$scope.posicion -= 5;
		}
	}
}]);