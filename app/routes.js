app.run(function($rootScope, $state, Flash, AuthService) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // Caso ocorra um erro na rota, esse teste garante que se for um 404 (Sem autorização) o usuário
    // é redirecionado para o home com uma mensagem de erro.
    if (error.status === 401) {
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
    // Rota para o HOME
    .state('home', {
      url: "/home",
      views: {
        "container@": {
          controller: "HomeController",
          templateUrl: "views/home/home.html"
        },
        "nav@": {
            controller: "HomeController",
            templateUrl: "views/navbar.html"
        }
      }
    })
    // Rota para registro
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
    // Rota para login
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

    // Rota para projetos
    .state('projects', {
      url: "/projects",
      views: {
        "container@": {
          controller: "ProjectController",
          templateUrl: "views/projects/index.html"
        },
        "nav@": {
            controller: "HomeController",
            templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        isLogged: function(AuthService){
          return AuthService.is_logged();
        },
        projectList: function(ProjectService){
          return ProjectService.getAll();
        }
      }
    })

    // Rota para novos projetos
    .state('projects-new', {
      url: "/projects/new",
      views: {
        "container@": {
          controller: "ProjectController",
          templateUrl: "views/projects/form.html"
        },
        "nav@": {
            controller: "HomeController",
            templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        isLogged: function(AuthService){
          return AuthService.is_logged();
        },
        projectList: function(ProjectService){
          return undefined;
        }
      }
    })
    // Rota para editar projetos
    .state('projects-edit', {
      url: "/projects/{id:string}/edit",
      views: {
        "container@": {
          controller: "ProjectController",
          templateUrl: "views/projects/edit.html"
        },
        "nav@": {
            controller: "HomeController",
            templateUrl: "views/navbar.html"
        }
      },
      resolve: {
        isLogged: function(AuthService){
          return AuthService.is_logged();
        },
        projectList: function(ProjectService){
          return undefined;
        }
      }
    })

});