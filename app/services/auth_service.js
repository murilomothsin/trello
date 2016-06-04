app.service("AuthService", function(localStorageService, $http){

	this.create_session = function(token){
		localStorageService.set("token", token);
	}

  this.destroy_session = function(){
    localStorageService.clearAll();
  }

	this.is_logged = function(){
		var token = localStorageService.get("token");
		return $http.post("http://localhost:3000/users/valid_token", {token: token});
	}
	
});