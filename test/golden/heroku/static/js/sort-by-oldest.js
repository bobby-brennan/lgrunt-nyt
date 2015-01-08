console.log('set ctrler');
app.controller('sortByOldestController', function($scope) {
  console.log('controller loading');
  $scope.loadData = function(inputs) {
    console.log('loading data');
    $.ajax('sortByOldest')
    .done(function(data) {
      $scope.result = JSON.parse(data);
      $scope.$apply();
    })
    .fail(function(err) {
       console.log('Error loading data:' + err);
    })
  }

  $scope.loadData();
})
