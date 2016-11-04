app.controller('modelosAutomovilCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.setActive("mAutomovil");

	$scope.modelos = {};
	$scope.posicion = 5;
	$scope.mostrarSpinner = true;

	$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/modelo/listar')
		.success(function(data) {
			$scope.mostrarSpinner = false;
			console.log(data);
			$scope.modelos = data.listaModelos;
		}
	);
	
	$scope.siguientes = function() {
		if ($scope.modelos.length > $scope.posicion) {
			$scope.posicion += 5;
		}
	}

	$scope.anteriores = function() {
		if ($scope.posicion > 5) {
			$scope.posicion -= 5;
		}
	}
}]);