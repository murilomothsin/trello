app.controller("ProjectsController", function( $scope, $stateParams, ProjectService, projectsList ) {

  $scope.projects = []
  $scope.project = {}

  if(projectsList != undefined)
    $scope.projects = projectsList.data.projects;

  $scope.boardName = '';
  $scope.boards = [];

  $scope.save = function(){
    $scope.project.boards = $scope.boards;
    ProjectService.save($scope.project).then(function(project){
      console.log(project);
      $state.go('projects');
    });
  }

  $scope.addBoard = function(){
    $scope.boards.push({name: $scope.boardName});
    $scope.boardName = '';
  };

  $scope.removeBoard = function(index){
    $scope.boards.splice(index, 1);
  }

  if($stateParams.id !== undefined){
    ProjectService.get($stateParams.id).then(function(data){
      $scope.project = data.data.project;
      data.data.project.boards.forEach(function(value, key){
        $scope.boards.push(value);
      });
    });
  }

  $scope.addTask = function(board, text){
    board.tasks.push({name: text, complete: false});
  }

});