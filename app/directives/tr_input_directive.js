/*
RESTRICT
A => attribute
E => element
C => class
M => comment
SCOPE
@ => text binding / one way binding
= => model binding / two way binding
& => callbacks / method binding
*/
app.directive('trInput', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/tr_input_directive.html',
    scope: {
      name: "@",
      label: "@",
      model: "=",
      placeholder: "@",
      type: "@"
    },
    controller: function($scope){
      
      $scope.capitalLetter = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  };
});