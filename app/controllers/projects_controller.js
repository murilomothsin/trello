app.controller("ProjectsController", function( $scope, $firebaseObject, $firebaseArray ) {

  var ref = new Firebase("https://scorching-torch-5279.firebaseio.com/projects");
  $scope.projects = $firebaseArray(ref);

  $scope.Add = function(){
    $scope.projects.$add($scope.project);
    $scope.project = {};
  }

});