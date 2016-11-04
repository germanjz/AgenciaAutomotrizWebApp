app.controller('modeloAutomovilCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.setActive("mAutomovil");
	$scope.modelo = {};
	$scope.marcas = [];

	$scope.accion = "";
	$scope.creando = false;
	$scope.activar = true;

	var idModelo = $routeParams.id;

	if (idModelo == "nuevo") {
		$scope.creando = true;
		$scope.accion = "add";
	} else {
		$scope.creando = false;
		$scope.accion = "update";

		$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/modelo/' + idModelo)
			.success(function(data) {
				//console.log(data);
				if (data.code != 0) {
					window.location = "#/modelos";
					return;
				}
				$scope.modelo = data;
				$scope.modelo.idMarca = data.marca.id;
			}
		);
	}

	$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/catalogos/catalogoMarcas')
		.success(function(data) {
			console.log(data);
			if (data.code == 0) {
				$scope.marcas = data.listaMarcas;
			}
			
		}
	);

	$scope.eliminar = function() {
		$scope.accion = "delete";
	}

	$scope.registrarCambiosModelo = function () {
		if ($scope.creando) {
			$http.post('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/modelo/add', $scope.modelo)
				.success(function (data) {
					//console.log(data);
					if (data.code == 0) {
						alert('Hecho!! Status: ' + data.msgError);
					} else {
						console.log(data.msgError);
						alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
					}
					window.location = "#/modelos";
					return;
				}
			);
		} else {
			if($scope.accion === "update") {
				$http.put('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/modelo/update/' + idModelo, $scope.modelo)
					.success(function (data) {
						//console.log(data);
						if (data.code == 0) {
							alert('Hecho!! Status: ' + data.msgError);
						} else {
							console.log(data.msgError);
							alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
						}
						window.location = "#/modelos";
						return;
					}
				);
			} else if($scope.accion === "delete") {
				if (confirm('Estas seguro de eliminar este registro?')) {
					$http.delete('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/modelo/delete/' + idModelo)
						.success(function (data) {
							if (data.code == 0) {
								alert('Hecho!! Status: ' + data.msgError);
							} else {
								console.log(data.msgError);
								alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
							}
							window.location = "#/modelos";
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