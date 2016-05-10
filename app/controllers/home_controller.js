app.controller("HomeController", function( $scope, $state, UserService, currentAuth, Flash ) {

  $scope.user = {};
  $scope.isAuth = currentAuth !== null;

  $scope.Register = function() {
    console.log($scope.user);
    UserService.register($scope.user).then(function(userData) {
      console.log(userData);
      var id = Flash.create('success', "Usuário registrado!", 3000, {class: 'flash-position'});
      if(userData.status === 200)
        $state.go('login');
    }).catch(function(error) {
      var id = Flash.create('danger', "Erro: "+error+"!", 0, {class: 'flash-position'});
      console.error("Error: ", error);
    });
  };

  $scope.Login = function(event) {
    event.preventDefault();

    Auth.$authWithPassword($scope.user)
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
            console.log(user);
            $state.go('projects');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
            console.log(error);
            $scope.errors = error;
        });
  };

  $scope.Logout = function() {
    Auth.$unauth();
    $state.go('home');
  }

  $scope.whoami = function(){
    var authData = Auth.$getAuth();
    console.log(authData);
  }
});