app.service('ProjectService', function($http, localStorageService){
  
  this.getAll = function(){
    console.log(localStorageService.get('token'));
    return $http.get('http://localhost:3000/projects', { headers: {'Authorization': localStorageService.get('token')} });
  };

  this.create = function(data = {}){
    return $http.post('http://localhost:3000/projects', data, { headers: {'Authorization': localStorageService.get('token')} });
  };

  this.get = function(id){
    return $http.get('http://localhost:3000/projects/'+id, { headers: {'Authorization': localStorageService.get('token')} });
  };

});