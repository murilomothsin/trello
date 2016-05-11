app.controller("ProjectsController", function( $scope, $uibModal, ProjectService ) {

  $scope.projects = []

  ProjectService.getAll().then(function(data){
    $scope.projects = data.data.projects;
  })

});

app.controller("NewProjectController", function( $scope, ProjectService ) {

  $scope.project = {};
  $scope.boardName = '';
  $scope.boards = [];

  $scope.save = function(){
    console.log($scope.project);
    console.log($scope.boards);
    $scope.project.boards = $scope.boards;
    ProjectService.create($scope.project).then(function(project){
      console.log(project);
    });
    // $scope.projects.$add($scope.project);
    // $scope.project = {};
  }

  $scope.addBoard = function(){
    $scope.boards.push({name: $scope.boardName});
    $scope.boardName = '';
  };

  $scope.removeBoard = function(index){
    $scope.boards.splice(index, 1);
  }

});

app.controller("EditProjectController", function( $scope, $stateParams, ProjectService ) {

  $scope.boards = [];
  ProjectService.get($stateParams.id).then(function(data){
    $scope.project = data.data.project;
    data.data.project.boards.forEach(function(value, key){
      $scope.boards.push(value);
    });
  });
  //$scope.project = {name: 'Project 1', description: 'Teste'};


  for (var i = 0; i < 4; i++) {
  //  $scope.boards.push({name: "Board "+i, created_at: new Date(), tasks: [{name: 'teste', complete: false}, {name: 'Tarefa', complete: true}] });
  }

  $scope.addTask = function(board, text){
    board.tasks.push({name: text, complete: false});
  }


});