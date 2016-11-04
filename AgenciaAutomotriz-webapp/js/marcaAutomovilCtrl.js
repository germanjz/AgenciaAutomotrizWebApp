app.controller('marcaAutomovilCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.setActive("mAutomovil");
	$scope.marca = {};

	$scope.accion = "";
	$scope.creando = false;
	$scope.activar = true;

	var idMarca = $routeParams.id;

	if (idMarca == "nuevo") {
		$scope.creando = true;
		$scope.accion = "add";
	} else {
		$scope.creando = false;
		$scope.accion = "update";

		$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/marca/' + idMarca)
			.success(function(data) {
				//console.log(data);
				if (data.code != 0) {
					window.location = "#/marcas";
					return;
				}
				$scope.marca = data;
			}
		);
	}

	$scope.eliminar = function() {
		$scope.accion = "delete";
	}

	$scope.registrarCambiosMarca = function () {
		if ($scope.creando) {
			$http.post('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/marca/add', $scope.marca)
				.success(function (data) {
					//console.log(data);
					if (data.code == 0) {
						alert('Hecho!! Status: ' + data.msgError);
					} else {
						console.log(data.msgError);
						alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
					}
					window.location = "#/marcas";
					return;
				}
			);
		} else {
			if($scope.accion === "update") {
				$http.put('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/marca/update/' + idMarca, $scope.marca)
					.success(function (data) {
						//console.log(data);
						if (data.code == 0) {
							alert('Hecho!! Status: ' + data.msgError);
						} else {
							console.log(data.msgError);
							alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
						}
						window.location = "#/marcas";
						return;
					}
				);
			} else if($scope.accion === "delete") {
				if (confirm('Estas seguro de eliminar este registro?')) {
					$http.delete('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/marca/delete/' + idMarca)
						.success(function (data) {
							if (data.code == 0) {
								alert('Hecho!! Status: ' + data.msgError);
							} else {
								console.log(data.msgError);
								alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
							}
							window.location = "#/marcas";
							return;
						}
					);
				} else {
					$scope.accion = "update";
				}
			}
		}
	}
}]);