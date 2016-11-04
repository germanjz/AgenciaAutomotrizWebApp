app.config(function($routeProvider) {
	
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'inicioCtrl'
		})
		.when('/automoviles', {
			templateUrl: 'views/automoviles.html',
			controller: 'automovilesCtrl'
		})
		.when('/automovil/:id', {
			templateUrl: 'views/automovil_detalle.html',
			controller: 'automovilCtrl'
		})
		.when('/marcas', {
			templateUrl: 'views/marcas_automovil.html',
			controller: 'marcasAutomovilCtrl'
		})
		.when('/marca/:id', {
			templateUrl: 'views/marca_automovil.html',
			controller: 'marcaAutomovilCtrl'
		})
		.when('/modelos', {
			templateUrl: 'views/modelos_automovil.html',
			controller: 'modelosAutomovilCtrl'
		})
		.when('/modelo/:id', {
			templateUrl: 'views/modelo_automovil.html',
			controller: 'modeloAutomovilCtrl'
		})
		.when('/motos', {
			templateUrl: 'views/motocicletas.html',
			controller: 'motocicletasCtrl'
		})
		.otherwise({
			redirectTo: "/"
		});
});