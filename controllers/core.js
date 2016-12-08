var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/users').success(function(response) {
    $scope.users = response;
    $scope.user = "";
  });
};

refresh();

$scope.edit = function(id) {
  console.log(id);
  $http.get('/users/' + id).success(function(response) {
    $scope.user = response;
  });
};  


$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/users/' + $scope.user.cid, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}])