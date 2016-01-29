app.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      views: {
        "container@": {
          controller: "HomeController",
          templateUrl: "views/home/index.html"
        }
      }
    })
    .state('projects', {
      url: "/projects",
      views: {
        "container@": {
          controller: "ProjectsController",
          templateUrl: "views/projects/index.html"
        }
      }
    })
    .state('tasks', {
      url: "/tasks",
      views: {
        "container@": {
          controller: "TasksController",
          templateUrl: "views/tasks/index.html"
        }
      }
    });
});