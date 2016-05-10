app.service('UserService', function($http){
  
  this.register = function(data = {}){
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: data
    });
  };

});