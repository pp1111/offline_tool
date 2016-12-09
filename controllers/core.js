var myApp = angular.module('myApp', []);
myApp.controller('AnalyticsCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/analytics').success(function(response) {
    $scope.users = response;
    $scope.user = "";
  });
};

refresh();

$scope.edit = function(id) {
  console.log(id);
  $http.get('/analytics/' + id).success(function(response) {
    $scope.user = response;
  });
};  


$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/analytics/' + $scope.user.cid, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}])

myApp.controller('AdWordsCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/adWords').success(function(response) {
    $scope.users = response;
    $scope.user = "";
  });
};

refresh();

$scope.edit = function(id) {
  console.log(id);
  $http.get('/adWords/' + id).success(function(response) {
    $scope.user = response;
  });
};  


$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/adWords/' + $scope.user.cid, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}])

myApp.controller('DoubleClickCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/doubleClick').success(function(response) {
    $scope.users = response;
    $scope.user = "";
  });
};

refresh();

$scope.edit = function(id) {
  console.log(id);
  $http.get('/doubleClick/' + id).success(function(response) {
    $scope.user = response;
  });
};  


$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/doubleClick/' + $scope.user.cid, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}])