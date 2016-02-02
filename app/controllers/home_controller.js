app.controller("HomeController", function( $scope, $state, $firebaseAuth, Auth, currentAuth ) {

  console.log(currentAuth);
  $scope.isAuth = currentAuth !== null;

  $scope.SignIn = function() {
    event.preventDefault();  // To prevent form refresh
    var username = $scope.user.email;
    var password = $scope.user.password;

    Auth.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
            console.log(user);
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
            console.log(error);
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