app.controller('automovilCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.setActive("mAutomovil");
	$scope.automovil = {};

	$scope.accion = "";
	$scope.creando = false;
	$scope.idMarca = 0;

	$scope.marcas = [];
	$scope.modelos = [];
	$scope.activar = true;

	var idAutomovil = $routeParams.id;

	if (idAutomovil == "nuevo") {
		$scope.creando = true;
		$scope.accion = "add";
	} else {
		$scope.creando = false;
		$scope.accion = "update";

		$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/' + idAutomovil)
			.success(function(data) {
				//console.log(data);
				if (data.code != 0) {
					window.location = "#/automoviles";
					return;
				}
				$scope.automovil = data;
				$scope.idMarca = data.idMarca;

				$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/catalogos/catalogoModelos/' + $scope.idMarca)
					.success(function(data) {
						$scope.activar = false;
						//console.log(data);
						if (data.code == 0) {
							$scope.modelos = data.listaModelos;
						}
					}
				);
			}
		);
	}

	$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/catalogos/catalogoMarcas')
		.success(function(data) {
			//console.log(data);
			if (data.code == 0) {
				$scope.marcas = data.listaMarcas;
			}
			
		}
	);

	$scope.cambiarModelos = function(id_marca) {
		$http.get('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/catalogos/catalogoModelos/' + id_marca)
			.success(function(data) {
				$scope.activar = false;
				//console.log(data);
				if (data.code == 0) {
					$scope.modelos = data.listaModelos;
				}
			}
		);
	};

	$scope.eliminar = function() {
		$scope.accion = "delete";
	}

	$scope.registrarCambiosAutomovil = function () {
		if ($scope.creando) {
			$http.post('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/add', $scope.automovil)
				.success(function (data) {
					//console.log(data);
					if (data.code == 0) {
						alert('Hecho!! Status: ' + data.msgError);
					} else {
						console.log(data.msgError);
						alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
					}
					window.location = "#/automoviles";
					return;
				}
			);
		} else {
			if($scope.accion === "update") {
				$http.put('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/update/' + idAutomovil, $scope.automovil)
					.success(function (data) {
						//console.log(data);
						if (data.code == 0) {
							alert('Hecho!! Status: ' + data.msgError);
						} else {
							console.log(data.msgError);
							alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
						}
						window.location = "#/automoviles";
						return;
					}
				);
			} else if($scope.accion === "delete") {
				if (confirm('Estas seguro de eliminar este registro?')) {
					$http.delete('http://localhost:8080/AgenciaAutomotrizWS/api/v1/agencia/automovil/delete/' + idAutomovil)
						.success(function (data) {
							if (data.code == 0) {
								alert('Hecho!! Status: ' + data.msgError);
							} else {
								console.log(data.msgError);
								alert('Hubo un error al realizar la operación. Código: ' + data.code + ' Detalle: ' + data.msgError);
							}
							window.location = "#/automoviles";
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