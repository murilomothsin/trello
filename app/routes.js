app.run(function($rootScope, $state, Flash, AuthService) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // Caso ocorra um erro na rota, esse teste garante que se for um 404 (Sem autorização) o usuário
    // é redirecionado para o home com uma mensagem de erro.
    if (error.status === 404) {
      var id = Flash.create('danger', error.data.data, 0, {class: 'flash-position'});
      AuthService.destroy_session();
      $state.go("home");
    }
  });
});

// Configuração do ui-router
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      need_auth: false,
      views: {
        "container@": {
          controller: "HomeController",
          templateUrl: "views/home/index.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
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
        projectsList: function(ProjectService){
          return ProjectService.getAll();
        },
        isLogged: function(AuthService){
          return AuthService.is_logged();
        }
      }
    })
    .state('projects-new', {
      url: "/projects/new",
      views: {
        "container@": {
          controller: "ProjectsController",
          templateUrl: "views/projects/form.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        projectsList: function(ProjectService){
          return undefined;
        },
        isLogged: function(AuthService){
          return AuthService.is_logged();
        }
      }
    })
    .state('projects-edit', {
      url: "/projects/{id:string}/edit",
      views: {
        "container@": {
          controller: "ProjectsController",
          templateUrl: "views/projects/edit.html"
        },
        "nav@": {
          controller: "HomeController",
          templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        projectsList: function(ProjectService){
          return undefined;
        },
        isLogged: function(AuthService){
          return AuthService.is_logged();
        }
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
        isLogged: function(AuthService){
          return AuthService.is_logged();
        }
      }
    });
});