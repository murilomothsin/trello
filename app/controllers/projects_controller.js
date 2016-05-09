app.controller("ProjectsController", function( $scope, $firebaseObject, $firebaseArray, $uibModal ) {

  //var ref = new Firebase("https://scorching-torch-5279.firebaseio.com/projects");
  //$scope.projects = $firebaseArray(ref);
  $scope.projects = []

  for (var i = 0; i < 10; i++) {
    $scope.projects.push({name: "Projeto "+i, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", author: "Murilo Mothsin", created_at: new Date()});
  }

  $scope.Add = function(){
    console.log($scope.project);
    // $scope.projects.$add($scope.project);
    $scope.project = {};
    modalInstance.close();
  }

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'addProjectModal.html'
    });
  };

});

app.controller("NewProjectController", function( $scope ) {

  $scope.project = {};
  $scope.boardName = '';
  $scope.boards = [];

  $scope.save = function(){
    console.log($scope.project);
    // $scope.projects.$add($scope.project);
    // $scope.project = {};
  }

  $scope.addBoard = function(){
    $scope.boards.push({name: $scope.boardName});
    $scope.boardName = '';
  };

});

app.controller("EditProjectController", function( $scope ) {

  $scope.project = {name: 'Project 1', description: 'Teste'};

  $scope.boards = [];

  for (var i = 0; i < 4; i++) {
    $scope.boards.push({name: "Board "+i, created_at: new Date(), tasks: [{name: 'teste', complete: false}, {name: 'Tarefa', complete: true}] });
  }

  $scope.addTask = function(board, text){
    board.tasks.push({name: text, complete: false});
  }


});