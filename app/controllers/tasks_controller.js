app.controller("TasksController", function( $scope, $firebaseObject, $firebaseArray ) {
  //$scope.tasks = [];
  $scope.task = {};

  var ref = new Firebase("https://scorching-torch-5279.firebaseio.com/tasks");
  var refBoards = new Firebase("https://scorching-torch-5279.firebaseio.com/boards");
   $scope.tasks = $firebaseArray(ref);
  var syncObject = $firebaseObject(refBoards);
  console.log(syncObject);
  //syncObject.$bindTo($scope, "data");
  // $scope.data = $firebaseObject(ref);
  console.log($scope.data);
  $scope.AddBoard = function(){
    var randomRoomId = Math.round(Math.random() * 100000000);
    var refBoard = new Firebase("https://scorching-torch-5279.firebaseio.com/boards/" + randomRoomId);
    //var profileRef = refBoard.child("tasks");
    var trrr = $firebaseObject(refBoard);
    trrr.name = $scope.board.name;
      // return it as a synchronized object
    console.log(trrr);
    trrr.$save().then(function() {
      alert('Profile saved!');
    }).catch(function(error) {
      alert('Error!');
    });
  }
  $scope.Add = function(){
    $scope.tasks.$add($scope.task);
    $scope.task = {};
  }

});
