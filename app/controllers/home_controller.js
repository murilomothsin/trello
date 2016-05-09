app.controller("HomeController", function( $scope, $state, $firebaseAuth, Auth, currentAuth ) {

  $scope.user = {};
  $scope.isAuth = currentAuth !== null;

  $scope.Register = function() {
    Auth.$createUser($scope.user).then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");

      return Auth.$authWithPassword($scope.user);
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $state.go('projects');
    }).catch(function(error) {
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