app.service('UserService', function($http){
  
  this.register = function(data = {}){
    return $http.post('http://localhost:3000/users/register', data);
  };

  this.login = function(data = {}){
    return $http.post('http://localhost:3000/users/login', data);
  };

});