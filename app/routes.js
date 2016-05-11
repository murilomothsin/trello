app.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }
  });
}]);

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
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        "currentAuth": ["Auth", function(Auth) { return Auth.$waitForAuth(); }]
      }
    })
    .state('login', {
      url: "/login",
      views: {
        "container@": {
          controller: "HomeController",
          templateUrl: "views/home/login.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        "currentAuth": ["Auth", function(Auth) { return Auth.$waitForAuth(); }]
      }
    })
    .state('register', {
      url: "/register",
      views: {
        "container@": {
          controller: "HomeController",
          templateUrl: "views/home/register.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        "currentAuth": ["Auth", function(Auth) { return Auth.$waitForAuth(); }]
      }
    })
    .state('projects', {
      url: "/projects",
      views: {
        "container@": {
          controller: "ProjectsController",
          templateUrl: "views/projects/index.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return true;
          return Auth.$requireAuth();
        }]
      }
    })
    .state('projects-new', {
      url: "/projects/new",
      views: {
        "container@": {
          controller: "NewProjectController",
          templateUrl: "views/projects/form.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return true;
          return Auth.$requireAuth();
        }]
      }
    })
    .state('projects-edit', {
      url: "/projects/{id:string}/edit",
      views: {
        "container@": {
          controller: "EditProjectController",
          templateUrl: "views/projects/edit.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return true;
          return Auth.$requireAuth();
        }]
      }
    })
    .state('tasks', {
      url: "/tasks",
      views: {
        "container@": {
          controller: "TasksController",
          templateUrl: "views/tasks/index.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }]
      }
    });
});