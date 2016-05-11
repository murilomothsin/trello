app.controller("HomeController", function( $scope, $state, UserService, currentAuth, Flash, localStorageService ) {

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
    UserService.login($scope.user).then(function(userData) {
      console.log(userData);
      if(userData.status === 200 && userData.data.token !== undefined){
        var id = Flash.create('success', "Bem vindo!", 3000, {class: 'flash-position'});
        localStorageService.set("token", userData.data.token);
        $state.go('projects');
      }
    }).catch(function(error) {
      var id = Flash.create('danger', "Erro: "+error+"!", 0, {class: 'flash-position'});
      console.error("Error: ", error);
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