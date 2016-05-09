app.filter('capitalLetter', function(){
  return function(input){
    if(input === undefined)
      return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});