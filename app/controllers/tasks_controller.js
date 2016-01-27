app.controller("TasksController", function( $scope ) {
  $scope.tasks = [];
  $scope.task = {};

  $scope.Add = function(){
    $scope.tasks.push($scope.task);
    $scope.task = {};
  }

});
