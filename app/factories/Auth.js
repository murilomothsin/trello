app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://scorching-torch-5279.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);