app.controller("HomeController", function( $scope, $state, UserService, Flash, AuthService ){
	// Teste para saber se o usuário está logado
	$scope.is_logged = false;
	AuthService.is_logged().then(function(dataToken){
		$scope.is_logged = true;
	}, function(error){
		$scope.is_logged = false;
	});

	$scope.user = {};
	$scope.Register = function(event){
		console.log($scope.user);
		UserService.register($scope.user).then(function(dataUser){
			console.log(dataUser);
			$state.go("login");
		}, function(error){
			$scope.errors = error.data.data;
		})
	}

	$scope.Login = function(event){
		UserService.login($scope.user).then(function(dataUser){
			AuthService.create_session(dataUser.data.token);
			$state.go("projects");
			var id = Flash.create('success', "Bem vindo! ", 3000, {class: 'flash-position'});
		}, function(error){
			var id = Flash.create('danger', "Erro: "+error.data.data+"!", 0, {class: 'flash-position'});
		})
	}
});