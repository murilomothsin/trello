app.controller("TasksController", function( $scope, $firebaseObject, $firebaseArray ) {
  //$scope.tasks = [];
  $scope.task = {};

  var ref = new Firebase("https://scorching-torch-5279.firebaseio.com/tasks");
   $scope.tasks = $firebaseArray(ref);
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "data");
  // $scope.data = $firebaseObject(ref);
  console.log($scope.data);

  $scope.Add = function(){
    $scope.tasks.$add($scope.task);
    $scope.task = {};
  }

});
